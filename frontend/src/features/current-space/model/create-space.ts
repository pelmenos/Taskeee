import { atom } from "shared/lib/factory"
import { $user, createUploadFileMutation } from "shared/api"
import { combine, createEvent, createStore, restore, sample } from "effector"
import { SpaceFormSchema , createCreateSpaceMutation } from "entities/space"

import { not, or, spread } from "patronum"
import { createGate } from "effector-react"
import { update } from "@farfetched/core"
import { mapFormError } from "shared/lib/map-form-errors"
import { spaceModel } from "./space"

type CreateSpaceFormSchema = {
  name: string,
  description: string,
  avatar: File | null,
}

export const createSpaceModel = atom(() => {
  const Gate = createGate<() => void>()

  const $successCallback = restore(Gate.open, null)

  const uploadFileMutation = createUploadFileMutation()

  const createSpaceMutation = createCreateSpaceMutation()

  const submitted = createEvent<CreateSpaceFormSchema>()

  const throttleSubmitted = sample({
    source: submitted,
    filter: not(or(
      uploadFileMutation.$pending,
      createSpaceMutation.$pending,
    )),
  })

  const fileUploaded = createEvent<string>()

  const $errorFieldName = createStore<string | null>(null)
  const $errorFieldDescription = createStore<string | null>(null)
  const $errorFieldAvatar = createStore<string | null>(null)

  const $formErrors = combine({
    name: $errorFieldName,
    description: $errorFieldDescription,
    avatar: $errorFieldAvatar,
  })

  const $spaceFormSchema = createStore<Omit<SpaceFormSchema, "avatar"> | null>(null)

  // Store form schema.
  sample({
    clock: throttleSubmitted,
    source: {
      user: $user,
    },
    filter: (source) => !!source.user,
    fn: (source, clock) => ({
      name: clock.name,
      description: clock.description,
      admin_id: source.user!.id,
      tariff: "Pro", // TODO: hardcode <3
    }),
    target: $spaceFormSchema,
  })

  // If avatar submitted, then upload it.
  sample({
    source: throttleSubmitted,
    filter: (source) => !!source.avatar,
    fn: (source) => source.avatar as File,
    target: uploadFileMutation.start,
  })

  // Else just submit form.
  sample({
    source: throttleSubmitted,
    filter: (source) => !source.avatar,
    fn: () => "",
    target: fileUploaded,
  })

  sample({
    source: uploadFileMutation.finished.success,
    filter: (source) => !!source.result?.path,
    fn: (source) => source.result!.path,
    target: fileUploaded,
  })

  sample({
    clock: fileUploaded,
    source: $spaceFormSchema,
    fn: (source, clock) => ({
      ...source!,
      avatar: clock,
    }),
    target: createSpaceMutation.start,
  })

  sample({
    clock: createSpaceMutation.finished.success,
    source: $successCallback,
    fn: (source) => source?.call(null),
  })

  sample({
    source: uploadFileMutation.finished.failure,
    fn: (source) => source.error.data?.message ?? null,
    target: $errorFieldAvatar,
  })

  sample({
    source: createSpaceMutation.finished.failure,
    fn: (source) =>
      mapFormError(
        source,
        (message) => ({
          name: message,
          description: null,
          avatar: null,
        }),
      ),
    target: spread({
      name: $errorFieldName,
      description: $errorFieldDescription,
      avatar: $errorFieldAvatar,
    }),
  })

  update(spaceModel.spaceListQuery,
    {
      on: createSpaceMutation,
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
    },
  )

  return {
    Gate,

    createSpaceMutation,

    submitted,

    $formErrors,
  }
})
