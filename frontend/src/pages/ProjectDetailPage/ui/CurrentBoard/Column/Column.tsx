import "./Column.scss"
import { Group, Paper, Stack, StackProps, Title } from "@mantine/core"
import { TaskListItem, TaskStatus } from "entities/task"
import { SortIcon } from "shared/ui/assets/icons/SortIcon"
import { SettingIcon } from "shared/ui/assets/icons/SettingIcon"
import { CreateTaskInput } from "./CreateTaskInput"
import { TaskCard } from "./TaskCard"

interface Props extends StackProps {
	column: string
	tasks: TaskListItem[]
}

export const Column = ({ column, tasks, ...props }: Props) => {
	return (
		<Stack gap="sm" {...props}>
			<Paper bg="surface" px="md">
				<Group h={48} align="center">
					<SortIcon />

					<Title order={2} fz="md" fw={600}>
						{column}
					</Title>

					<SettingIcon ml="auto" />
				</Group>
			</Paper>

			<CreateTaskInput column={column as TaskStatus} />

			{tasks.map((item) => (
				<TaskCard key={item.id} data={item} />
			))}
		</Stack>
	)
}
