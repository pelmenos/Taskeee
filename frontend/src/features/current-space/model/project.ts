import { atom } from "shared/lib/factory"
import {
	createProjectDetailQuery,
	createProjectListQuery,
	ProjectDetail,
	ProjectListItem,
} from "entities/project"

import { createEvent, createStore, sample } from "effector"
import { BoardDetail, BoardListItem, createBoardDetailQuery } from "entities/board"
import { debug, not } from "patronum"
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
import { update } from "@farfetched/core"
import { spaceModel } from "./space"

export const projectModel = atom(() => {
	const projectListQuery = createProjectListQuery()
	const projectDetailQuery = createProjectDetailQuery()
	const boardDetailQuery = createBoardDetailQuery()
	const createTaskMutation = createCreateTaskMutation()
	const updateTaskMutation = createUpdateTaskMutation()
	const deleteTaskMutation = createDeleteTaskMutation()

	const currentProjectChanged = createEvent<{ id: string }>()

	const currentBoardChanged = createEvent<{ id: string }>()

	const taskSubmitted = createEvent<{ name: string; status: TaskStatus }>()
	const taskUpdated = createEvent<TaskUpdateSchema>()
	const taskDeleted = createEvent<TaskDeleteSchema>()

	const $availableProjects = createStore<Array<ProjectListItem>>([])
	const $currentProject = createStore<ProjectDetail | null>(null)

	const $availableBoards = createStore<Array<BoardListItem>>([])

	debug($availableBoards)
	const $currentBoard = createStore<BoardDetail | null>(null)

	const $columns = createStore<Record<TaskStatus, TaskListItem[]> | null>(null)

	sample({
		source: spaceModel.$currentSpace,
		filter: Boolean,
		fn: (source) => ({
			space_id: source.id,
		}),
		target: projectListQuery.start,
	})

	sample({
		clock: projectListQuery.finished.success,
		fn: ({ result }) => result,
		target: $availableProjects,
	})

	sample({
		source: currentProjectChanged,
		filter: not(projectDetailQuery.$pending),
		target: projectDetailQuery.start,
	})

	sample({
		source: projectDetailQuery.$data,
		target: $currentProject,
	})

	sample({
		clock: $currentProject,
		filter: Boolean,
		fn: ({ boards }) => boards,
		target: $availableBoards,
	})

	sample({
		source: currentBoardChanged,
		filter: not(boardDetailQuery.$pending),
		target: boardDetailQuery.start,
	})

	sample({
		source: boardDetailQuery.$data,
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

	sample({
		clock: taskSubmitted,
		source: {
			board: $currentBoard,
			pending: createTaskMutation.$pending,
		},
		filter: ({ board, pending }) => !!board && !pending,
		fn: ({ board }, form) => ({
			...form,
			board_id: board!.id,
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
		projectListQuery,
		projectDetailQuery,
		boardDetailQuery,
		createTaskMutation,

		currentProjectChanged,
		currentBoardChanged,
		taskSubmitted,
		taskUpdated,
		taskDeleted,

		$availableProjects,
		$currentProject,
		$availableBoards,
		$currentBoard,

		$columns,
	}
})
