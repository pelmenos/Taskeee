import { atom } from "shared/lib/factory"
import { combine, createEvent, createStore, sample } from "effector"
import { not, reset, spread } from "patronum"
import { routes } from "shared/routing"
import { createPasswordRecoveryMutation } from "entities/auth"
import { mapFormError } from "shared/lib/map-form-errors"
import { stagesModel } from "./stages"

export type StagePasswordRecoveryFields = {
  password: string
}

export const passwordRecoveryModel = atom(() => {
  const passwordRecoveryMutation = createPasswordRecoveryMutation()

  const submitted = createEvent<StagePasswordRecoveryFields>()

  const $errorFieldPassword = createStore<string | null>(null)

  const $formErrors = combine({
    password: $errorFieldPassword,
  })

  sample({
    clock: submitted,
    source: {
      email: stagesModel.$email,
      verify_code: stagesModel.$code,
    },
    filter: not(passwordRecoveryMutation.$pending),
    fn: (source, clock) => ({
      ...source,
      ...clock,
    }),
    target: passwordRecoveryMutation.start,
  })

  sample({
    clock: passwordRecoveryMutation.finished.success,
    target: routes.auth.login.open,
  })

  reset({
    clock: [submitted, passwordRecoveryMutation.finished.success],
    target: [
      $errorFieldPassword,
    ],
  })

  sample({
    source: passwordRecoveryMutation.finished.failure,
    filter: (source) => !!source.error.data,
    fn: (source) =>
      mapFormError(
        source,
        (message) => ({
          password: message,
        }),
      ),
    target: spread({
      password: $errorFieldPassword,
    }),
  })

  return {
    submitted,
    $formErrors,
  }
})
