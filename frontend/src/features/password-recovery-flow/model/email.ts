import { atom } from "shared/lib/factory"
import { combine, createEvent, createStore, sample } from "effector"
import { not, reset, spread } from "patronum"
import { createPasswordRecoveryEmailMutation } from "entities/auth/api"
import { PasswordRecoveryFlowStages, stagesModel } from "./stages"

export type StageEmailFields = {
  email: string
}

export const emailModel = atom(() => {
  const passwordRecoveryEmailMutation = createPasswordRecoveryEmailMutation()

  const submitted = createEvent<StageEmailFields>()

  const $errorFieldEmail = createStore<string | null>(null)

  const $formErrors = combine({
    email: $errorFieldEmail,
  })

  sample({
    source: submitted,
    filter: not(passwordRecoveryEmailMutation.$pending),
    target: passwordRecoveryEmailMutation.start,
  })

  sample({
    source: passwordRecoveryEmailMutation.finished.success,
    fn: (source) => source.result.email,
    target: stagesModel.$email,
  })

  sample({
    clock: passwordRecoveryEmailMutation.finished.success,
    fn: () => PasswordRecoveryFlowStages.EmailConfirmStage,
    target: stagesModel.$stage,
  })

  reset({
    clock: [submitted, passwordRecoveryEmailMutation.finished.success],
    target: [
      $errorFieldEmail,
    ],
  })

  sample({
    clock: passwordRecoveryEmailMutation.finished.success,
    fn: () => null,
    target: $errorFieldEmail,
  })

  sample({
    source: passwordRecoveryEmailMutation.finished.failure,
    filter: (source) => !!source.error.data,
    fn: (source) => {
      if (source.error.data!.errors) {
        const errors = source.error.data!.errors

        return {
          email: errors.email ? errors.email[0] : null,
        }
      }

      return {
        email: source.error.data!.message,
      }
    },
    target: spread({
      email: $errorFieldEmail,
    }),
  })

  return {
    submitted,

    $formErrors,
  }
})
