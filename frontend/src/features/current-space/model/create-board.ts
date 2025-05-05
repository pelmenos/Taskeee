import { atom } from "shared/lib/factory"
import { BoardSchema, createCreateBoardMutation } from "entities/board"
import { combine, createEvent, createStore, restore, sample, split } from "effector"
import { not, spread } from "patronum"
import { createGate } from "effector-react"
import { mapErrors } from "shared/lib/map-form-errors"
import { update } from "@farfetched/core"
import { ProjectDetail } from "entities/project"
import { projectModel } from "./project"

export const createBoardModel = atom(() => {
	const Gate = createGate<() => void>()

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

	const submitted = createEvent<Omit<BoardSchema, "project_id">>()

	const throttleSubmitted = sample({
		source: submitted,
		filter: not(createBoardMutation.$pending),
	})

	const $errorFieldName = createStore<string | null>(null)
	const $errorFieldDescription = createStore<string | null>(null)

	const $formErrors = combine({
		name: $errorFieldName,
		description: $errorFieldDescription,
	})

	sample({
		clock: throttleSubmitted,
		source: {
			project: projectModel.$currentProject,
		},
		fn: (source, clock) => ({
			...clock,
			project_id: source.project!.id,
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

	return {
		Gate,

		createBoardMutation,

		submitted,

		$formErrors,
	}
})
