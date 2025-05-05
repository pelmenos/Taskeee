import { createApiMutation } from "shared/api/createApiMutation"
import {
	createTaskContract,
	TaskDeleteSchema,
	TaskSchema,
	TaskUpdateSchema,
	updateTaskContract,
} from "../model"

export const createCreateTaskMutation = () =>
	createApiMutation({
		request: (params: TaskSchema) => ({
			method: "POST",
			url: "/api/tasks",
			body: params,
		}),
		response: {
			contract: createTaskContract,
		},
	})

export const createUpdateTaskMutation = () =>
	createApiMutation({
		request: (params: TaskUpdateSchema) => ({
			method: "PUT",
			url: `/api/tasks/${params.id}`,
			body: params,
		}),
		response: {
			contract: updateTaskContract,
		},
	})

export const createDeleteTaskMutation = () =>
	createApiMutation({
		request: (params: TaskDeleteSchema) => ({
			method: "DELETE",
			url: `/api/tasks/${params.id}`,
		}),
	})
