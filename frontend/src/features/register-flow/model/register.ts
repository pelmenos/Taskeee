import { atom } from "shared/lib/factory"
import { RegisterFormSchema , createRegisterMutation } from "entities/auth"

import { combine, createEvent, createStore, sample } from "effector"
import { not, reset, spread } from "patronum"
import { mapFormError } from "shared/lib/map-form-errors"
import { RegisterFlowStages, stagesModel } from "./stages"

export const registerModel = atom(() => {
  const registerMutation = createRegisterMutation()

  const submitted = createEvent<RegisterFormSchema>()

  const $errorFieldName = createStore<string | null>(null)
  const $errorFieldEmail = createStore<string | null>(null)
  const $errorPassword = createStore<string | null>(null)

  const $formErrors = combine({
    name: $errorFieldName,
    email: $errorFieldEmail,
    password: $errorPassword,
  })

  sample({
    source: submitted,
    filter: not(registerMutation.$pending),
    target: registerMutation.start,
  })

  sample({
    source: registerMutation.finished.success,
    fn: (source) => source.result.email,
    target: stagesModel.$email,
  })

  sample({
    clock: registerMutation.finished.success,
    fn: () => RegisterFlowStages.Confirm,
    target: stagesModel.$currentStage,
  })

  reset({
    clock: [registerMutation.finished.success, submitted],
    target: [
      $errorFieldName,
      $errorFieldEmail,
      $errorPassword,
    ],
  })

  sample({
    source: registerMutation.finished.failure,
    filter: (source) => !!source.error.data,
    fn: (source) =>
      mapFormError(
        source,
        (message) => ({
          name: message,
          email: null,
          password: null,
        }),
      ),
    target: spread({
      name: $errorFieldName,
      email: $errorFieldEmail,
      password: $errorPassword,
    }),
  })

  return {
    submitted,

    $formErrors,
  }
})
