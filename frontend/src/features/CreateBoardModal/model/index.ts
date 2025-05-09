import { createGate } from "effector-react"
import { combine, createEvent, createStore, restore, sample, split } from "effector"
import { BoardSchema, createCreateBoardMutation } from "entities/board"
import { mapErrors } from "shared/lib/map-form-errors"
import { spread } from "patronum"
import { update } from "@farfetched/core"
import { ProjectDetail } from "entities/project"
import { projectModel } from "features/current-space"

export const Gate = createGate<() => void>()

const $successCallback = restore(Gate.open, null)

const createBoardMutation = createCreateBoardMutation()

const { failure, success } = split(
	sample({
		clock: createBoardMutation.finished.success,
		fn: ({ result }) => result,
	}),
	{
		failure: (result) => "errors" in result,
		success: (result) => "token" in result,
	},
)

export const submitPressed = createEvent<Omit<BoardSchema, "project_id">>()

const $errorFieldName = createStore<string | null>(null)
const $errorFieldDescription = createStore<string | null>(null)

export const $formErrors = combine({
	name: $errorFieldName,
	description: $errorFieldDescription,
})

sample({
	clock: submitPressed,
	source: {
		currentProject: projectModel.$currentProject,
		pending: createBoardMutation.$pending,
	},
	filter: ({ currentProject, pending }) => Boolean(currentProject && !pending),
	fn: ({ currentProject }, form) => ({
		...form,
		project_id: currentProject!.id,
	}),
	target: createBoardMutation.start,
})

sample({
	clock: success,
	source: $successCallback,
	fn: (source) => source?.call(null),
})

sample({
	clock: failure,
	fn: ({ errors }) => mapErrors(errors),
	target: spread({
		name: $errorFieldName,
		description: $errorFieldDescription,
	}),
})

update(projectModel.projectDetailQuery, {
	on: createBoardMutation,
	by: {
		success: ({ query }) => {
			let result: ProjectDetail

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
