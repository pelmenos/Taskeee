import "./StageCreateSpace.scss"
import { StackProps, Button, Stack, Title } from "@mantine/core"

import { StackIcon } from "shared/ui/assets/icons/StackIcon"
import { ChevronRightIcon } from "shared/ui/assets/icons/ChevronRightIcon"
import { useDisclosure } from "@mantine/hooks"
import { CreateSpaceModal } from "features/CreateSpaceModal"

interface Props extends StackProps {}

export const StageCreateSpace = (props: Props) => {
	const [opened, { open, close }] = useDisclosure(false)

	return (
		<Stack gap="xl" {...props}>
			<Title order={1} size="h1">
				Управляйте своими проектами с лёгкостью!
			</Title>

			<Title order={2} c="onSurfaceVariant" size="h2">
				Здесь будут отображаться все ваши проекты, их статус,
				<br />
				прогресс и команды. Начните с первого шага!
			</Title>

			<Button
				w="fit-content"
				size="lg"
				leftSection={<StackIcon />}
				rightSection={<ChevronRightIcon />}
				onClick={open}
			>
				Создать пространство
			</Button>

			<CreateSpaceModal opened={opened} onClose={close} />
		</Stack>
	)
}
