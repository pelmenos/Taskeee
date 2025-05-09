import { routes } from "shared/routing"
import { chainAuthorized } from "shared/session"
import { combine, createEvent, createStore, sample, split } from "effector"
import { projectModel } from "features/current-space"
import {
	createDeleteProjectMutation,
	createUpdateProjectMutation,
	ProjectListItem,
	UpdateProjectSchema,
} from "entities/project"
import { mapErrors } from "shared/lib/map-form-errors"
import { spread } from "patronum"
import { update } from "@farfetched/core"

const currentRoute = routes.project.detail

export const authorizedRoute = chainAuthorized({
	route: currentRoute,
	otherwise: routes.auth.login.open,
})

sample({
	source: authorizedRoute.opened,
	fn: (source) => source.params,
	target: projectModel.currentProjectChanged,
})

const deleteProjectMutation = createDeleteProjectMutation()
const updateProjectMutation = createUpdateProjectMutation()

const { failure } = split(
	sample({
		clock: updateProjectMutation.finished.success,
		fn: ({ result }) => result,
	}),
	{
		failure: (result) => "errors" in result,
	},
)

export const updateProjectPressed = createEvent<Omit<UpdateProjectSchema, "id">>()
export const deleteProjectPressed = createEvent()

sample({
	clock: updateProjectPressed,
	source: {
		currentProject: projectModel.$currentProject,
		pending: updateProjectMutation.$pending,
	},
	filter: ({ currentProject, pending }) => Boolean(currentProject && !pending),
	fn: ({ currentProject }, form) => ({
		...form,
		id: currentProject!.id,
	}),
	target: updateProjectMutation.start,
})

const $errorFieldName = createStore<string | null>(null)
const $errorFieldDescription = createStore<string | null>(null)
const $errorFieldMembers = createStore<string | null>(null)

export const $formErrors = combine({
	name: $errorFieldName,
	description: $errorFieldDescription,
	members: $errorFieldMembers,
})

sample({
	clock: failure,
	fn: ({ errors }) => mapErrors(errors),
	target: spread({
		name: $errorFieldName,
		description: $errorFieldDescription,
		members: $errorFieldMembers,
	}),
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

sample({
	clock: deleteProjectPressed,
	source: {
		currentProject: projectModel.$currentProject,
		pending: deleteProjectMutation.$pending,
	},
	filter: ({ currentProject, pending }) => Boolean(currentProject && !pending),
	fn: ({ currentProject }) => ({
		id: currentProject!.id,
	}),
	target: deleteProjectMutation.start,
})

update(projectModel.projectListQuery, {
	on: deleteProjectMutation,
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

sample({
	clock: deleteProjectMutation.finished.success,
	fn: () => ({
		params: {},
		query: {},
		replace: true,
	}),
	target: routes.project.list.navigate,
})

update(projectModel.projectListQuery, {
	on: updateProjectMutation,
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
