import { createApiMutation } from "shared/lib/createApiMutation"
import {
	TaskFormError,
	TaskFormSchema,
	TaskFormSuccess,
	TaskUpdateError,
	TaskUpdateSchema,
	TaskUpdateSuccess,
} from "../model"

export const createCreateTaskMutation = () =>
	createApiMutation<TaskFormSchema, TaskFormSuccess, TaskFormError>((params) => ({
		method: "POST",
		url: "/api/tasks",
		body: params,
	}))

export const createUpdateTaskMutation = () =>
	createApiMutation<TaskUpdateSchema, TaskUpdateSuccess, TaskUpdateError>((params) => ({
		method: "PUT",
		url: `/api/tasks/${params.id}`,
		body: params,
	}))
