import "./CreateRoleModal.scss"
import {Button, Checkbox, Stack, TextInput, Title} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useGate, useUnit} from "effector-react";
import {ComponentProps, useEffect} from "react"
import {CustomModal} from "shared/ui/CustomModal";
import {$formErrors, Gate, submitPressed} from "../model";


interface Props extends ComponentProps<typeof CustomModal> {

}

export const CreateRoleModal = (props: Props) => {
  const formErrors = useUnit($formErrors)
  const addMember = useUnit(submitPressed)

  const {setErrors, ...form} = useForm({
    mode: "controlled",
    initialValues: {
      name: "",
      description: "",
      permissions: {
        finance_access: false,
        projects_access: false,
        team_access: false,
        full_access: false,
      }
    },
  })

  useEffect(() => {
    setErrors(formErrors)
  }, [setErrors, formErrors])

  useGate(Gate, () => {
    props.onClose()
  })

  const handleSubmit = (fields: typeof form.values) => {
    console.log(fields);
    addMember(fields)
  }

  return (
    <CustomModal {...props}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Title
          order={3}
          size="h1"
        >
          Создание роли
        </Title>

        <TextInput
          mt="xxl"
          label="Название"
          placeholder="Monene"
          key={form.key("name")}
          {...form.getInputProps("name")}
        />

        <TextInput
          label="Описание"
          placeholder="Monene"
          key={form.key("description")}
          {...form.getInputProps("description")}
        />

        <Stack mt="md">
          <Checkbox
            label="Доступ к командам"
            key={form.key("permissions.team_access")}
            {...form.getInputProps("permissions.team_access")}
          />

          <Checkbox
            label="Доступ к проектам"
            key={form.key("permissions.projects_access")}
            {...form.getInputProps("permissions.projects_access")}
          />

          <Checkbox
            label="Полный доступ"
            key={form.key("permissions.full_access")}
            {...form.getInputProps("permissions.full_access")}
          />
        </Stack>


        <Button
          mt="lg"
          type="submit"
          fullWidth
        >
          Добавить роль
        </Button>
      </form>
    </CustomModal>
  )
}
