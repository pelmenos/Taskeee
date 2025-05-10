import {createEvent, createStore, sample} from "effector"
import {
  createProjectDetailQuery,
  createProjectListQuery,
  createSearchProjectQuery,
  ProjectDetail,
  ProjectListItem,
} from "entities/project"
import {debounce, not} from "patronum"
import {atom} from "shared/lib/factory"
import {spaceModel} from "./space"

export const projectModel = atom(() => {
  const searchProjectQuery = createSearchProjectQuery()
  const projectListQuery = createProjectListQuery()
  const projectDetailQuery = createProjectDetailQuery()

  const currentProjectChanged = createEvent<{ id: string }>()
  const $availableProjects = createStore<Array<ProjectListItem>>([])

  const $currentProject = createStore<ProjectDetail | null>(null)

  const $availableBoards = $currentProject.map((project) => project?.boards ?? [])

  const searchQueryChanged = createEvent<string>()

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
    fn: ({result}) => result,
    target: $availableProjects,
  })

  sample({
    clock: debounce(searchQueryChanged, 300),
    source: spaceModel.$currentSpace,
    filter: (currentSpace) => Boolean(currentSpace),
    fn: (currentSpace, searchQuery) => ({
      space_id: currentSpace!.id,
      query: searchQuery,
    }),
    target: searchProjectQuery.start,
  })

  sample({
    clock: searchProjectQuery.finished.success,
    fn: ({result}) => result,
    target: $availableProjects,
  })

  sample({
    source: currentProjectChanged,
    filter: not(projectDetailQuery.$pending),
    target: projectDetailQuery.start,
  })

  sample({
    clock: projectDetailQuery.finished.success,
    fn: ({result}) => result,
    target: $currentProject,
  })

  return {
    projectListQuery,
    projectDetailQuery,

    currentProjectChanged,
    searchQueryChanged,

    $availableProjects,
    $currentProject,
    $availableBoards,
  }
})
