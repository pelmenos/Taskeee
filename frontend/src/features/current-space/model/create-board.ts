import { atom } from "shared/lib/factory"
import { BoardFormSchema, createCreateBoardMutation } from "entities/board"
import { combine, createEvent, createStore, restore, sample } from "effector"
import { not, spread } from "patronum"
import { createGate } from "effector-react"
import { mapFormError } from "shared/lib/map-form-errors"
import { update } from "@farfetched/core"
import { projectModel } from "./project"

export const createBoardModel = atom(() => {
  const Gate = createGate<() => void>()

  const $successCallback = restore(Gate.open, null)

  const createBoardMutation = createCreateBoardMutation()

  const submitted = createEvent<Omit<BoardFormSchema, "project_id">>()


  const throttleSubmitted = sample({
    source: submitted,
    filter: not(
      createBoardMutation.$pending,
    ),
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
    clock: createBoardMutation.finished.success,
    source: $successCallback,
    fn: (source) => source?.call(null),
  })

  sample({
    source: createBoardMutation.finished.failure,
    fn: (source) => mapFormError(
      source,
      (message) => ({
        name: message,
        description: null,
        members: null,
      })),
    target: spread({
      name: $errorFieldName,
      description: $errorFieldDescription,
    }),
  })

  update(projectModel.projectDetailQuery, {
    on: createBoardMutation,
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
    },
  })

  return {
    Gate,

    createBoardMutation,

    submitted,

    $formErrors,

  }
})
