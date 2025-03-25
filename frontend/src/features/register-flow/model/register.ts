import { atom } from "shared/lib/factory"
import { createRegisterMutation } from "entities/auth/api"
import { combine, createEvent, createStore, sample } from "effector"
import { RegisterFormSchema } from "entities/auth/model"
import { not, reset, spread } from "patronum"
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
    fn: (source) => {
      if (source.error.data!.errors) {
        const errors = source.error.data!.errors

        return {
          errorFieldName: errors.name ? errors.name[0] : null,
          errorFieldEmail: errors.email ? errors.email[0] : null,
          errorPassword: errors.password ? errors.password[0] : null,
        }
      }

      return {
        errorFieldName: source.error.data!.message,
        errorFieldEmail: null,
        errorPassword: null,
      }
    },
    target: spread({
      errorFieldName: $errorFieldName,
      errorFieldEmail: $errorFieldEmail,
      errorPassword: $errorPassword,
    }),
  })

  return {
    submitted,

    $formErrors,
  }
})
