import { TaskListItem, TaskStatus } from "../model"

export const filterByStatus = (tasks: Array<TaskListItem>, status: TaskStatus) =>
	tasks.filter((task) => task.status === status)
