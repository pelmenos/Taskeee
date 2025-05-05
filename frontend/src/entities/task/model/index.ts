import { obj, or, str, UnContract, val } from "@withease/contracts"
import { createErrorContract } from "shared/api/types"
import { en } from "shared/lib/contracts"

export enum TaskStatus {
	Planned = "Запланировано",
	InProgress = "В процессе",
	Completed = "Выполнено",
	OnHold = "Отложено",
	Dropped = "Брошено",
}

export type TaskSchema = {
	board_id: string
	name: string
	status: TaskStatus
}

const createTaskSuccessContract = obj({
	name: str,
})

const createTaskFailureContract = createErrorContract(["board_id", "name", "description"])

export const createTaskContract = or(createTaskSuccessContract, createTaskFailureContract)

export const taskListItemContract = obj({
	id: str,
	name: str,
	description: or(str, val(null)),
	status: en(TaskStatus),
	board_id: str,
	created_at: str,
	updated_at: str,
})

export type TaskListItem = UnContract<typeof taskListItemContract>

export type TaskUpdateSchema = {
	id: string
	board_id: string
	name: string
	description: string | null
	status: TaskStatus
}

const updateTaskSuccessContract = obj({
	project_id: str,
	name: str,
})

const updateTaskFailureContract = createErrorContract([
	"id",
	"board_id",
	"name",
	"description",
	"status",
])

export const updateTaskContract = or(updateTaskSuccessContract, updateTaskFailureContract)

export type TaskDeleteSchema = {
	id: string
}
