import { ErrorResponse } from "shared/api"
import type { TaskListItem } from "../../task"

export type BoardFormSchema = {
	project_id: string
	name: string
	description: string
}

export type BoardFormSuccess = {
	id: string
	name: string
	description: string | null
	project_id: string
	created_at: string
	updated_at: string
}

export type BoardFormError = ErrorResponse<BoardFormSchema>

export type BoardListItem = {
	id: string
	name: string
	description: string
	project_id: string
	created_at: string
	updated_at: string
}

export type BoardDetailParams = {
	id: string
}

export type BoardDetailSuccess = BoardDetail

export type BoardDetailError = ErrorResponse<BoardDetailParams>

export type BoardDetail = {
	id: string
	name: string
	description: string
	project_id: string
	tasks: TaskListItem[]
	created_at: string
	updated_at: string
}
