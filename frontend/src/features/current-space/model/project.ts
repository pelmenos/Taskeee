import { atom } from "shared/lib/factory"
import { createProjectListQuery } from "entities/project/api"
import { createStore, sample } from "effector"
import type { ProjectListItem } from "entities/project/model"
import { normalizeListResponse } from "shared/lib/normalizeListResponse"
import { spaceModel } from "./space"


export const projectModel = atom(() => {
  const projectListQuery = createProjectListQuery()

  const $availableProjects = createStore<Array<ProjectListItem>>([])

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

  return {
    projectListQuery,

    $availableProjects,
  }
})
