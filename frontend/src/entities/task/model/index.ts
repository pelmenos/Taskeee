import { ErrorResponse } from "shared/api"

export enum TaskStatus {
	InProgress = "В процессе",
	Completed = "Выполнена",
}

export type TaskFormSchema = {
	board_id: string
	name: string
	status: TaskStatus
}

export type TaskFormSuccess = {
	project_id: string
	name: string
}

export type TaskFormError = ErrorResponse<TaskFormSchema>

export type TaskListItem = {
	id: string
	name: string
	description: string | null
	status: TaskStatus
	board_id: string
	created_at: string
	updated_at: string
}

export type TaskUpdateSchema = {
	id: string
	board_id: string
	name: string
	description: string | null
	status: TaskStatus
}

export type TaskUpdateSuccess = {
	project_id: string
	name: string
}

export type TaskUpdateError = ErrorResponse<TaskUpdateSchema>

export type TaskDeleteSchema = {
	id: string
}

export type TaskDeleteSuccess = {
	project_id: string
	name: string
}

export type TaskDeleteError = ErrorResponse<TaskDeleteSchema>
