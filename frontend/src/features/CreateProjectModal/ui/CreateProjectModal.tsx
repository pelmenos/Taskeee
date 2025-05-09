import "./CreateProjectModal.scss"
import { ComponentProps, useEffect } from "react"

import { CustomModal } from "shared/ui/CustomModal"
import { Button, TextInput, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useGate, useUnit } from "effector-react"
import { $formErrors, Gate, submitPressed } from "../model"

interface Props extends ComponentProps<typeof CustomModal> {}

export const CreateProjectModal = (props: Props) => {
	const createProject = useUnit(submitPressed)
	const formErrors = useUnit($formErrors)

	const { setErrors, ...form } = useForm({
		mode: "uncontrolled",
		initialValues: {
			name: "",
			description: "",
			members: "",
		},
	})

	useEffect(() => {
		setErrors(formErrors)
	}, [setErrors, formErrors])

	useGate(Gate, () => {
		props.onClose()
	})

	const handleSubmit = (fields: typeof form.values) => {
		createProject({
			name: fields.name,
			description: fields.description,
		})
	}

	return (
		<CustomModal {...props}>
			<form onSubmit={form.onSubmit(handleSubmit)}>
				<Title order={3} size="h1">
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

				<Button mt="lg" type="submit" fullWidth>
					Создать проект
				</Button>
			</form>
		</CustomModal>
	)
}
