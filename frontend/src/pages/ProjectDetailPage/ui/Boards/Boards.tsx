import "./Boards.scss"
import { Button, Card, Paper, PaperProps, Stack, Text } from "@mantine/core"
import { Link } from "atomic-router-react"
import { ChevronLeftIcon } from "shared/ui/assets/icons/ChevronLeftIcon"
import { PlusIcon } from "shared/ui/assets/icons/PlusIcon"
import { pluralize } from "shared/lib/pluralize"
import { useUnit } from "effector-react"
import { CreateBoardModal, projectModel } from "features/current-space"
import { useDisclosure } from "@mantine/hooks"
import { RouteInstance, RouteParams } from "atomic-router"

interface Props extends PaperProps {
	backRoute: RouteInstance<RouteParams>
}

export const Boards = ({ backRoute, ...props }: Props) => {
	const [opened, { open, close }] = useDisclosure(false)

	const availableBoards = useUnit(projectModel.$availableBoards)
	const currentBoardChanged = useUnit(projectModel.currentBoardChanged)

	return (
		<Paper bg="surface" p="xl" w={260} {...props}>
			<Stack gap="xl">
				<Button
					component={Link}
					to={backRoute}
					size="xs"
					w="fit-content"
					bg="black"
					leftSection={<ChevronLeftIcon />}
				>
					Назад
				</Button>

				<Button size="md" leftSection={<PlusIcon />} onClick={open}>
					Создать доску
				</Button>

				<Stack>
					{availableBoards.map((board) => (
						<Card
							key={board.id}
							bg="surfaceHighest"
							bd="2px solid var(--mantine-color-primary-0)"
							onClick={() => {
								currentBoardChanged({
									id: board.id,
								})
							}}
						>
							<Text c="onSurfaceHighest">{board.name}</Text>

							<Text c="onSurfaceHighestVariant">
								{board.tasks_count} {pluralize(board.tasks_count, ["задача", "задачи", "задач"])}
							</Text>
						</Card>
					))}
				</Stack>
			</Stack>

			<CreateBoardModal opened={opened} onClose={close} />
		</Paper>
	)
}
