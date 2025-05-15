import "./AddMemberModal.scss"
import {Button, NativeSelect, TextInput, Title} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useGate, useUnit} from "effector-react";
import {ComponentProps, useEffect} from "react"
import {CustomModal} from "shared/ui/CustomModal";
import {spaceModel} from "../../current-space";
import {$formErrors, Gate, submitPressed} from "../model";


interface Props extends ComponentProps<typeof CustomModal> {
}

export const AddMemberModal = (props: Props) => {
  const availableRoles = useUnit(spaceModel.$availableRoles)

  const formErrors = useUnit($formErrors)
  const addMember = useUnit(submitPressed)

  const {setErrors, ...form} = useForm({
    mode: "controlled",
    initialValues: {
      role_id: "",
      email: "",
    },
  })

  useEffect(() => {
    setErrors(formErrors)
  }, [setErrors, formErrors])

  useGate(Gate, () => {
    props.onClose()
  })

  const handleSubmit = (fields: typeof form.values) => {
    addMember(fields)
  }

  return (
    <CustomModal {...props}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Title
          order={3}
          size="h1"
        >
          Добавление участника
        </Title>

        <NativeSelect
          label="Роль"
          mt="xxl"
          styles={(theme) => ({
            input: {
              background: theme.colors.surfaceHighest[0]
            }
          })}
          key={form.key("role_id")}
          {...form.getInputProps("role_id")}
        >
          <option value="" />

          {availableRoles.map(({id, name}) => (
            <option
              key={id}
              value={id}
            >
              {name}
            </option>
          ))}
        </NativeSelect>

        <TextInput
          label="Электронная почта"
          placeholder="email@example.com"
          key={form.key("email")}
          {...form.getInputProps("email")}
        />

        <Button
          mt="lg"
          type="submit"
          fullWidth
        >
          Добавить пользователя
        </Button>
      </form>
    </CustomModal>
  )
}
