import "./Column.scss"
import { Card, Group, Input, Paper, Stack, StackProps, Text, Title } from "@mantine/core"
import { TaskListItem, TaskStatus } from "entities/task"
import { SortIcon } from "shared/ui/assets/icons/SortIcon"
import { SettingIcon } from "shared/ui/assets/icons/SettingIcon"
import { KeyboardEventHandler, useState } from "react"
import { projectModel } from "features/current-space"
import { useUnit } from "effector-react"
import { CreateTaskInput } from "./CreateTaskInput"

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

interface TaskCardProps {
	data: TaskListItem
}

const TaskCard = ({ data }: TaskCardProps) => {
	const updated = useUnit(projectModel.taskUpdated)

	const [name, setName] = useState(data.name)
	const [isEditing, setIsEditing] = useState(false)

	const handleSubmit: KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key === "Enter") {
			updated({
				id: data.id,
				name: name,
				description: data.description,
				status: data.status,
				board_id: data.board_id,
			})

			setIsEditing(false)
		}
	}

	return (
		<Card bg="surface" p={16}>
			{isEditing ? (
				<Input value={name} onChange={(e) => setName(e.target.value)} onKeyDown={handleSubmit} />
			) : (
				<Text onClick={() => setIsEditing(true)}>{name}</Text>
			)}
		</Card>
	)
}
