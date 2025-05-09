import { atom } from "shared/lib/factory"
import {
	createProjectDetailQuery,
	createProjectListQuery,
	ProjectDetail,
	ProjectListItem,
} from "entities/project"

import { createEvent, createStore, sample } from "effector"
import { not } from "patronum"
import { spaceModel } from "./space"

export const projectModel = atom(() => {
	const projectListQuery = createProjectListQuery()
	const projectDetailQuery = createProjectDetailQuery()

	const currentProjectChanged = createEvent<{ id: string }>()
	const $availableProjects = createStore<Array<ProjectListItem>>([])

	const $currentProject = createStore<ProjectDetail | null>(null)

	const $availableBoards = $currentProject.map((project) => project?.boards ?? [])

	sample({
		clock: spaceModel.$currentSpace,
		filter: Boolean,
		fn: (currentSpace) => ({
			space_id: currentSpace.id,
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
		clock: projectDetailQuery.finished.success,
		fn: ({ result }) => result,
		target: $currentProject,
	})

	return {
		projectListQuery,
		projectDetailQuery,

		currentProjectChanged,

		$availableProjects,
		$currentProject,
		$availableBoards,
	}
})
