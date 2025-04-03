import { atom } from "shared/lib/factory"
import {
	createProjectDetailQuery,
	createProjectListQuery,
	ProjectDetail,
	ProjectListItem,
} from "entities/project"

import { createEvent, createStore, sample } from "effector"
import { normalizeListResponse } from "shared/lib/normalizeListResponse"
import { BoardDetail, BoardListItem, createBoardDetailQuery } from "entities/board"
import { not } from "patronum"
import {
	createCreateTaskMutation,
	createUpdateTaskMutation,
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

	const currentProjectChanged = createEvent<{ id: string }>()

	const currentBoardChanged = createEvent<{ id: string }>()

	const taskSubmitted = createEvent<{ name: string; status: TaskStatus }>()
	const taskUpdated = createEvent<TaskUpdateSchema>()

	const $availableProjects = createStore<Array<ProjectListItem>>([])
	const $currentProject = createStore<ProjectDetail | null>(null)

	const $availableBoards = createStore<Array<BoardListItem & { tasks_count: number }>>([])
	const $currentBoard = createStore<BoardDetail | null>(null)

	const $columns = createStore<Record<TaskStatus, TaskListItem[]>>(
		{} as Record<TaskStatus, TaskListItem[]>,
	)

	sample({
		source: spaceModel.$currentSpace,
		filter: Boolean,
		fn: (source) => ({
			space_id: source.id,
		}),
		target: projectListQuery.start,
	})

	sample({
		source: projectListQuery.finished.success,
		fn: normalizeListResponse<ProjectListItem>,
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
		source: $currentProject,
		filter: Boolean,
		fn: (source) =>
			source.boards.map((board) => ({
				...board,
				tasks_count: source.tasks.filter((task) => task.board_id === board.id).length,
			})),
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
		source: $currentBoard,
		fn: (source) => {
			if (!source) {
				return {} as Record<TaskStatus, TaskListItem[]>
			}

			return Object.groupBy(source.tasks, (item) => item.status) as Record<
				TaskStatus,
				TaskListItem[]
			>
		},
		target: $columns,
	})

	sample({
		clock: taskSubmitted,
		source: {
			board: $currentBoard,
			pending: createTaskMutation.$pending,
		},
		filter: (source) => !!source.board && !source.pending,
		fn: (source, clock) => ({
			...clock,
			board_id: source.board!.id,
		}),
		target: createTaskMutation.start,
	})

	sample({
		clock: taskUpdated,
		target: updateTaskMutation.start,
	})

	update(boardDetailQuery, {
		on: createTaskMutation,
		by: {
			success: ({ query }) => {
				let result = null

				if ("result" in query) {
					result = query.result
				}

				return {
					result: result,
					refetch: true,
				}
			},
		},
	})

	update(boardDetailQuery, {
		on: updateTaskMutation,
		by: {
			success: ({ query }) => {
				let result = null

				if ("result" in query) {
					result = query.result
				}

				return {
					result: result,
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

		$availableProjects,
		$currentProject,
		$availableBoards,
		$currentBoard,

		$columns,
	}
})
