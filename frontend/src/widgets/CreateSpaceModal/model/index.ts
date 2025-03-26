import {atom} from "shared/lib/factory";
import {$user, createUploadFileMutation} from "shared/api";
import {combine, createEvent, createStore, restore, sample} from "effector";
import {createCreateSpaceMutation} from "entities/space/api";
import {SpaceFormSchema} from "entities/space/model";
import {not, or, spread} from "patronum";
import {createGate} from "effector-react";

type CreateSpaceFormSchema = {
  name: string,
  description: string,
  avatar: File | null,
}

type SuccessCallback = () => void

export const createSpaceModel = atom(() => {
  const Gate = createGate<SuccessCallback>()

  const $successCallback = restore(Gate.open, null)

  const uploadFileMutation = createUploadFileMutation();

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
      tariff: "Pro" // TODO: hardcode <3
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
    fn: () => '',
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
    filter: Boolean,
    fn: (source, clock) => ({
      ...source,
      avatar: clock,
    }),
    target: createSpaceMutation.start,
  })

  sample({
    clock: createSpaceMutation.finished.success,
    source: $successCallback,
    fn: (source) => source?.call(null)
  })

  sample({
    source: uploadFileMutation.finished.failure,
    fn: (source) => source.error.data?.message ?? null,
    target: $errorFieldAvatar,
  })

  sample({
    source: createSpaceMutation.finished.failure,
    fn: (source) => {
      if (source.error.data?.errors) {
        const errors = source.error.data.errors

        return {
          name: errors.name ? errors.name[0] : null,
          description: errors.description ? errors.description[0] : null,
          avatar: errors.avatar ? errors.avatar[0] : null,
        }
      }

      return {
        name: source.error.data?.message ?? null,
        description: null,
        avatar: null,
      }
    },
    target: spread({
      name: $errorFieldName,
      description: $errorFieldDescription,
      avatar: $errorFieldAvatar,
    })
  })

  return {
    Gate,

    createSpaceMutation,

    submitted,

    $formErrors,
  }
})
