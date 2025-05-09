import "./Settings.scss"
import { Box, Button, Paper, PaperProps, Stack, TextInput, Title } from "@mantine/core"
import { ChevronLeftIcon } from "shared/ui/assets/icons/ChevronLeftIcon"
import { projectModel } from "features/current-space"
import { useUnit } from "effector-react"
import { useForm } from "@mantine/form"
import { useEffect } from "react"
import { TrashIcon } from "shared/ui/assets/icons/TrashIcon"
import { $formErrors, deleteProjectPressed, updateProjectPressed } from "../../model"

interface Props extends PaperProps {
	onClose?: () => void
}

export const Settings = ({ onClose, ...props }: Props) => {
	const currentProject = useUnit(projectModel.$currentProject)
	const updateProject = useUnit(updateProjectPressed)
	const deleteProject = useUnit(deleteProjectPressed)

	const formErrors = useUnit($formErrors)

	const { setErrors, ...form } = useForm({
		mode: "uncontrolled",
		initialValues: {
			name: currentProject?.name ?? "",
			description: currentProject?.description ?? "",
		},
	})

	useEffect(() => {
		setErrors(formErrors)
	}, [setErrors, formErrors])

	const handleSubmit = (fields: typeof form.values) => {
		updateProject({
			name: fields.name,
			description: fields.description,
		})
	}

	return (
		<Paper bg="surface" p="xl" w={400} {...props}>
			<Stack gap="xl" h="100%">
				<Button
					size="xs"
					w="fit-content"
					bg="black"
					leftSection={<ChevronLeftIcon />}
					onClick={onClose}
				>
					Скрыть
				</Button>

				<Box component="form" flex={1} onSubmit={form.onSubmit(handleSubmit)}>
					<Stack gap="sm">
						<Title size="h2" fw={800} lh={1.5}>
							Настройки проекта “{currentProject?.name}”
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
							Изменить проект
						</Button>
					</Stack>
				</Box>

				<Button bg="red" leftSection={<TrashIcon />} onClick={deleteProject}>
					Удалить проект
				</Button>
			</Stack>
		</Paper>
	)
}
