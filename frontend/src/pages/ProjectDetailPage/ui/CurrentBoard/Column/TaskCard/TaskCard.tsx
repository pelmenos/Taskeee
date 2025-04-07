import { TaskListItem } from "entities/task"
import { useUnit } from "effector-react"
import { projectModel } from "features/current-space"
import { KeyboardEventHandler, useState } from "react"
import { ActionIcon, Box, Card, Group, Input, Text } from "@mantine/core"
import { TrashIcon } from "shared/ui/assets/icons/TrashIcon"

interface TaskCardProps {
	data: TaskListItem
}

export const TaskCard = ({ data }: TaskCardProps) => {
	const updated = useUnit(projectModel.taskUpdated)
	const deleted = useUnit(projectModel.taskDeleted)

	const [name, setName] = useState(data.name)
	const [isEditing, setIsEditing] = useState(false)

	const handleSubmit: KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key === "Escape") {
			setName(data.name)
			setIsEditing(false)
		}

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
			<Group>
				<Box flex={1}>
					{isEditing ? (
						<Input
							value={name}
							onChange={(e) => setName(e.target.value)}
							onKeyDown={handleSubmit}
						/>
					) : (
						<Text onClick={() => setIsEditing(true)}>{name}</Text>
					)}
				</Box>

				<ActionIcon variant="transparent" onClick={() => deleted({ id: data.id })}>
					<TrashIcon size={24} />
				</ActionIcon>
			</Group>
		</Card>
	)
}
