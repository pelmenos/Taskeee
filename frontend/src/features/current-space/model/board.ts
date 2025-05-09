import { atom } from "shared/lib/factory"
import {
	createCreateTaskMutation,
	createDeleteTaskMutation,
	createUpdateTaskMutation,
	filterByStatus,
	TaskDeleteSchema,
	TaskListItem,
	TaskStatus,
	TaskUpdateSchema,
} from "entities/task"
import { createEvent, createStore, sample } from "effector"
import { not } from "patronum"
import { BoardDetail, createBoardDetailQuery } from "entities/board"
import { update } from "@farfetched/core"

export const boardModel = atom(() => {
	const boardDetailQuery = createBoardDetailQuery()

	const createTaskMutation = createCreateTaskMutation()
	const updateTaskMutation = createUpdateTaskMutation()
	const deleteTaskMutation = createDeleteTaskMutation()

	const currentBoardChanged = createEvent<{ id: string }>()

	const $currentBoard = createStore<BoardDetail | null>(null)

	const $columns = createStore<Record<TaskStatus, TaskListItem[]> | null>(null)

	const taskCreated = createEvent<{
		name: string
		status: TaskStatus
	}>()
	const taskUpdated = createEvent<TaskUpdateSchema>()
	const taskDeleted = createEvent<TaskDeleteSchema>()

	sample({
		clock: taskCreated,
		source: {
			currentBoard: $currentBoard,
			pending: createTaskMutation.$pending,
		},
		filter: ({ currentBoard, pending }) => Boolean(currentBoard && !pending),
		fn: ({ currentBoard }, form) => ({
			...form,
			board_id: currentBoard!.id,
		}),
		target: createTaskMutation.start,
	})

	sample({
		clock: taskUpdated,
		target: updateTaskMutation.start,
	})

	sample({
		clock: taskDeleted,
		target: deleteTaskMutation.start,
	})

	sample({
		clock: currentBoardChanged,
		filter: not(boardDetailQuery.$pending),
		target: boardDetailQuery.start,
	})

	sample({
		clock: boardDetailQuery.finished.success,
		fn: ({ result }) => result,
		target: $currentBoard,
	})

	sample({
		clock: $currentBoard,
		fn: (board) => {
			if (!board || !board.tasks.length) {
				return {
					[TaskStatus.Planned]: [],
					[TaskStatus.InProgress]: [],
					[TaskStatus.Completed]: [],
					[TaskStatus.OnHold]: [],
					[TaskStatus.Dropped]: [],
				} as Record<TaskStatus, TaskListItem[]>
			}

			return {
				[TaskStatus.Planned]: filterByStatus(board.tasks, TaskStatus.Planned),
				[TaskStatus.InProgress]: filterByStatus(board.tasks, TaskStatus.InProgress),
				[TaskStatus.Completed]: filterByStatus(board.tasks, TaskStatus.Completed),
				[TaskStatus.OnHold]: filterByStatus(board.tasks, TaskStatus.OnHold),
				[TaskStatus.Dropped]: filterByStatus(board.tasks, TaskStatus.Dropped),
			}
		},
		target: $columns,
	})

	update(boardDetailQuery, {
		on: createTaskMutation,
		by: {
			success: ({ query }) => {
				let result: BoardDetail

				if ("result" in query) {
					result = query.result
				}

				return {
					result: result!,
					refetch: true,
				}
			},
		},
	})

	update(boardDetailQuery, {
		on: updateTaskMutation,
		by: {
			success: ({ query }) => {
				let result: BoardDetail

				if ("result" in query) {
					result = query.result
				}

				return {
					result: result!,
					refetch: true,
				}
			},
		},
	})

	update(boardDetailQuery, {
		on: deleteTaskMutation,
		by: {
			success: ({ query }) => {
				let result: BoardDetail

				if ("result" in query) {
					result = query.result
				}

				return {
					result: result!,
					refetch: true,
				}
			},
		},
	})

	return {
		boardDetailQuery,

		createTaskMutation,
		updateTaskMutation,
		deleteTaskMutation,

		currentBoardChanged,
		taskCreated,
		taskUpdated,
		taskDeleted,

		$currentBoard,
		$columns,
	}
})
