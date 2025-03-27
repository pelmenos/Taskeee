import "./CreateSpaceModal.scss"
import {ComponentProps, useEffect} from "react"
import {Button, FileInput, TextInput, Title} from "@mantine/core"
import {CustomModal} from "shared/ui/CustomModal";
import {PaperPlusIcon} from "shared/ui/assets/icons/PaperPlusIcon";
import {useForm} from "@mantine/form";
import {useGate, useUnit} from "effector-react";
import {createSpaceModel} from "../model";


interface Props extends ComponentProps<typeof CustomModal> {

}

export const CreateSpaceModal = (props: Props) => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      description: "",
      avatar: null as File | null
    }
  })

  const submitted = useUnit(createSpaceModel.submitted)
  const formErrors = useUnit(createSpaceModel.$formErrors)

  useEffect(() => {
    form.setErrors(formErrors)
  }, [formErrors]);

  useGate(createSpaceModel.Gate, () => {
    props.onClose()
  })

  const handleSubmit = (fields: typeof form.values) => {
    submitted(fields)
  }

  return (
    <CustomModal

      {...props}
    >
      <form
        onSubmit={form.onSubmit(handleSubmit)}
      >

        <Title
          order={3}
          size="h1"
        >
          Создание пространства
        </Title>

        <TextInput
          mt="xxl"
          label="Название пространства"
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

        <FileInput
          label="Изображение"
          placeholder="Прикрепите изображение"
          rightSection={
            <PaperPlusIcon/>
          }
          key={form.key("avatar")}
          {...form.getInputProps("avatar")}
        />

        <Button
          mt="lg"
          type="submit"
          fullWidth
        >
          Создать пространство
        </Button>
      </form>
    </CustomModal>
  )
}
