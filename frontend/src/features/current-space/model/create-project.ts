import { atom } from "shared/lib/factory"
import { createGate } from "effector-react"
import { combine, createEvent, createStore, restore, sample, split } from "effector"
import { not, spread } from "patronum"
import { createCreateProjectMutation, CreateProjectSchema, ProjectListItem } from "entities/project"

import { update } from "@farfetched/core"
import { mapErrors } from "shared/lib/map-form-errors"
import { DEFAULT_BOARD } from "../config"
import { projectModel } from "./project"
import { spaceModel } from "./space"

export const createProjectModel = atom(() => {
	const Gate = createGate<() => void>()

	const $successCallback = restore(Gate.open, null)

	const createProjectMutation = createCreateProjectMutation()

	const { failure, success } = split(
		sample({
			clock: createProjectMutation.finished.success,
			fn: ({ result }) => result,
		}),
		{
			failure: (result) => "errors" in result,
			success: (result) => "id" in result,
		},
	)

	// TODO: resolve members
	const submitted = createEvent<Omit<CreateProjectSchema, "boards" | "space_id" | "members">>()

	const throttleSubmitted = sample({
		source: submitted,
		filter: not(createProjectMutation.$pending),
	})

	const $errorFieldName = createStore<string | null>(null)
	const $errorFieldDescription = createStore<string | null>(null)
	const $errorFieldMembers = createStore<string | null>(null)

	const $formErrors = combine({
		name: $errorFieldName,
		description: $errorFieldDescription,
		members: $errorFieldMembers,
	})

	sample({
		clock: throttleSubmitted,
		source: {
			space: spaceModel.$currentSpace,
		},
		fn: (source, clock) => ({
			...clock,
			space_id: source.space!.id,
			boards: [DEFAULT_BOARD],
		}),
		target: createProjectMutation.start,
	})

	sample({
		clock: success,
		source: $successCallback,
		fn: (source) => source?.call(null),
	})

	sample({
		source: failure,
		fn: ({ errors }) => mapErrors(errors),
		target: spread({
			name: $errorFieldName,
			description: $errorFieldDescription,
			members: $errorFieldMembers,
		}),
	})

	update(projectModel.projectListQuery, {
		on: createProjectMutation,
		by: {
			success: ({ query }) => {
				let result: Array<ProjectListItem> = []

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
		Gate,

		createProjectMutation,

		submitted,

		$formErrors,
	}
})
