import { atom } from "shared/lib/factory"
import { createGate } from "effector-react"
import { combine, createEvent, createStore, restore, sample } from "effector"
import { not, spread } from "patronum"
import { createCreateProjectMutation } from "entities/project/api"
import type { CreateProjectFormSchema } from "entities/project/model"
import { spaceModel } from "features/current-space/model/space"
import { DEFAULT_BOARD } from "../config"
import { update } from "@farfetched/core"
import { projectModel } from "features/current-space"

export const createProjectModel = atom(() => {
  const Gate = createGate<() => void>()

  const $successCallback = restore(Gate.open, null)

  const createProjectMutation = createCreateProjectMutation()

  const submitted = createEvent<
    // TODO: members conflict.
    Omit<CreateProjectFormSchema, "boards" | "space_id" | "members">
  >()

  const throttleSubmitted = sample({
    source: submitted,
    filter: not(
      createProjectMutation.$pending,
    ),
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
    clock: createProjectMutation.finished.success,
    source: $successCallback,
    fn: (source) => source?.call(null),
  })

  sample({
    source: createProjectMutation.finished.failure,
    fn: (source) => {
      if (source.error.data?.errors) {
        const errors = source.error.data.errors

        return {
          name: errors.name ? errors.name[0] : null,
          description: errors.description ? errors.description[0] : null,
          members: errors.members ? errors.members[0] : null,
        }
      }

      return {
        name: source.error.data?.message ?? null,
        description: null,
        members: null,
      }
    },
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
        let result = null

        if ("result" in query) {
          result = query.result
        }

        return ({
          result: result,
          refetch: true,
        })
      },
    }
  })

  return {
    Gate,

    createProjectMutation,

    submitted,

    $formErrors,
  }
})
