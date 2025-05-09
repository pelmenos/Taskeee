import "./StageCreateProject.scss"
import { StackProps, Button, Stack, Title } from "@mantine/core"

import { ChevronRightIcon } from "shared/ui/assets/icons/ChevronRightIcon"
import { useDisclosure } from "@mantine/hooks"
import { GraphIcon } from "shared/ui/assets/icons/GraphIcon"
import { CreateProjectModal } from "features/CreateProjectModal"

interface Props extends StackProps {}

export const StageCreateProject = (props: Props) => {
	const [opened, { open, close }] = useDisclosure(false)

	return (
		<Stack gap="xl" {...props}>
			<Title order={1} size="h1">
				Ура! Вы создали свое первое пространство
			</Title>

			<Title order={2} c="onSurfaceVariant" size="h2">
				Теперь, чтобы начать работу, предлагаем вам создать
				<br />
				ваш первый проект
			</Title>

			<Button
				w="fit-content"
				size="lg"
				leftSection={<GraphIcon />}
				rightSection={<ChevronRightIcon />}
				onClick={open}
			>
				Создать проект
			</Button>

			<CreateProjectModal opened={opened} onClose={close} />
		</Stack>
	)
}
