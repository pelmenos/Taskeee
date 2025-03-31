import "./CreateBoardModal.scss"
import { ComponentProps, useEffect } from "react"

import { CustomModal } from "shared/ui/CustomModal"
import { Button, TextInput, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useGate, useUnit } from "effector-react"
import { createBoardModel } from "../../model/create-board"


interface Props extends ComponentProps<typeof CustomModal> {

}

export const CreateBoardModal = (props: Props) => {
  const { setErrors, ...form } = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      description: "",
    },
  })

  const submitted = useUnit(createBoardModel.submitted)
  const formErrors = useUnit(createBoardModel.$formErrors)

  useEffect(() => {
    setErrors(formErrors)
  }, [setErrors, formErrors])

  useGate(createBoardModel.Gate, () => {
    props.onClose()
  })

  const handleSubmit = (fields: typeof form.values) => {
    submitted({
      name: fields.name,
      description: fields.description,
    })
  }

  return (
    <CustomModal

      {...props}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>

        <Title
          order={3}
          size="h1"
        >
          Создание доски
        </Title>

        <TextInput
          mt="xxl"
          label="Название доски"
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

        <Button
          mt="lg"
          type="submit"
          fullWidth
        >
          Создать доску
        </Button>
      </form>
    </CustomModal>
  )
}
