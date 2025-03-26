import "./CreateProjectModal.scss"
import {ComponentProps} from "react"
import {CustomModal} from "shared/ui/CustomModal";
import {Button, TextInput, Title} from "@mantine/core";


interface Props extends ComponentProps<typeof CustomModal> {

}

export const CreateProjectModal = (props: Props) => {
  return (
    <CustomModal

      {...props}
    >
      <form>

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
        />

        <TextInput
          label="Описание"
          placeholder="Monene"
        />

        <TextInput
          label="Участники"
          placeholder="Email"
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
