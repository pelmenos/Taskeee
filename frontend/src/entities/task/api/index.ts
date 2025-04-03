import { createApiMutation } from "shared/lib/createApiMutation"
import { TaskFormError, TaskFormSchema, TaskFormSuccess } from "../model"

export const createCreateTaskMutation = () =>
	createApiMutation<TaskFormSchema, TaskFormSuccess, TaskFormError>((params) => ({
		method: "POST",
		url: "/api/tasks",
		body: params,
	}))
