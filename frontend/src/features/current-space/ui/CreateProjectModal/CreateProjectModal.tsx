import "./CreateProjectModal.scss"
import { ComponentProps , useEffect } from "react"

import { CustomModal } from "shared/ui/CustomModal"
import { Button, TextInput, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useGate, useUnit } from "effector-react"
import { createProjectModel } from "../../model/create-project"


interface Props extends ComponentProps<typeof CustomModal> {

}

export const CreateProjectModal = (props: Props) => {
  const { setErrors, ...form } = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      description: "",
      members: "",
    },
  })

  const submitted = useUnit(createProjectModel.submitted)
  const formErrors = useUnit(createProjectModel.$formErrors)

  useEffect(() => {
    setErrors(formErrors)
  }, [setErrors, formErrors])

  useGate(createProjectModel.Gate, () => {
    props.onClose()
  })

  const handleSubmit = (fields: typeof form.values) => {
    submitted({
      name: fields.name,
      description: fields.description,
      // TODO: members conflict.
      // members: fields.members,
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
          Создание проекта
        </Title>

        <TextInput
          mt="xxl"
          label="Название проекта"
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

        <TextInput
          label="Участники"
          placeholder="Email"
          key={form.key("members")}
          {...form.getInputProps("members")}
        />

        <Button
          mt="lg"
          type="submit"
          fullWidth
        >
          Создать проект
        </Button>
      </form>
    </CustomModal>
  )
}
