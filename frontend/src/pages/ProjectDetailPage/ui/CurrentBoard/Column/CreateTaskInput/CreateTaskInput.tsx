import "./CreateTaskInput.scss"
import { KeyboardEventHandler, useState } from "react"
import { TextInput, TextInputProps } from "@mantine/core"
import { TaskStatus } from "entities/task"
import { useUnit } from "effector-react"
import { boardModel } from "features/current-space/model/board"

interface Props extends TextInputProps {
	column: TaskStatus
}

export const CreateTaskInput = ({ column, ...props }: Props) => {
	const [value, setValue] = useState("")

	const createTask = useUnit(boardModel.taskCreated)

	const handleSubmit: KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key === "Enter") {
			createTask({
				name: value,
				status: column,
			})

			setValue("")
		}
	}

	return (
		<TextInput
			size="md"
			radius="sm"
			ff="Montserrat. serif"
			fw={500}
			c="surfaceOutline"
			placeholder="Добавить задачу"
			styles={{
				input: {
					border: "1px solid var(--mantine-color-surfaceOutline-1)",
				},
			}}
			value={value}
			onChange={(e) => setValue(e.target.value)}
			onKeyDown={handleSubmit}
			{...props}
		/>
	)
}
