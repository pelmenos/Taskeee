import {update} from "@farfetched/core";
import {combine, createEvent, createStore, restore, sample, split} from "effector"
import {createGate} from "effector-react"
import {createCreateProjectMutation, CreateProjectSchema, ProjectListItem} from "entities/project"
import {projectModel, spaceModel} from "features/current-space"
import {spread} from "patronum"
import {mapErrors} from "shared/lib/map-form-errors"
import {DEFAULT_BOARD} from "../config"

export const Gate = createGate<() => void>()

const $successCallback = restore(Gate.open, null)

const createProjectMutation = createCreateProjectMutation()

const {failure, success} = split(
  sample({
    clock: createProjectMutation.finished.success,
    fn: ({result}) => result,
  }),
  {
    failure: (result) => "errors" in result,
    success: (result) => "id" in result,
  },
)

// TODO: resolve members
export const submitPressed =
  createEvent<Omit<CreateProjectSchema, "boards" | "space_id" | "members">>()

const $errorFieldName = createStore<string | null>(null)
const $errorFieldDescription = createStore<string | null>(null)
const $errorFieldMembers = createStore<string | null>(null)

export const $formErrors = combine({
  name: $errorFieldName,
  description: $errorFieldDescription,
  members: $errorFieldMembers,
})

sample({
  clock: submitPressed,
  source: {
    space: spaceModel.$currentSpace,
    pending: createProjectMutation.$pending,
  },
  filter: ({space, pending}) => Boolean(space && !pending),
  fn: ({space}, form) => ({
    ...form,
    space_id: space!.id,
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
  fn: ({errors}) => mapErrors(errors),
  target: spread({
    name: $errorFieldName,
    description: $errorFieldDescription,
    members: $errorFieldMembers,
  }),
})

update(projectModel.projectListQuery, {
  on: createProjectMutation,
  by: {
    success: ({query}) => {
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
