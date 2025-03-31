import { atom } from "shared/lib/factory"
import { createConfirmCodeResendMutation, createConfirmEmailMutation } from "entities/auth/api"
import { createGate } from "effector-react"
import { combine, createEvent, createStore, sample } from "effector"
import { interval, reset, spread } from "patronum"
import { routes } from "shared/routing"
import { stagesModel } from "./stages"

type StageConfirmFields = {
  code: number,
}

export const confirmModel = atom(() => {
  const confirmEmailMutation = createConfirmEmailMutation()

  const confirmCodeResendMutation = createConfirmCodeResendMutation()

  const Gate = createGate<void>()

  const submitted = createEvent<StageConfirmFields>()
  const codeResent = createEvent()

  const $errorFieldCode = createStore<string | null>(null)

  const $formErrors = combine({
    code: $errorFieldCode,
  })

  const $buttonUnlockedAfterTime = createStore(0)
  const $buttonResentIsDisabled = combine($buttonUnlockedAfterTime, (source) => !!source)

  const { tick } = interval({
    timeout: 1000,
    start: sample({
      source: $buttonUnlockedAfterTime,
      filter: Boolean,
    }),
    stop: sample({
      source: $buttonUnlockedAfterTime,
      filter: (source) => !source,
    }),
  })

  sample({
    clock: [Gate.open, codeResent],
    fn: () => 20,
    target: $buttonUnlockedAfterTime,
  })

  sample({
    clock: tick,
    source: $buttonUnlockedAfterTime,
    fn: (source) => source - 1,
    target: $buttonUnlockedAfterTime,
  })

  sample({
    clock: codeResent,
    source: {
      email: stagesModel.$email,
    },
    filter: $buttonResentIsDisabled,
    target: confirmCodeResendMutation.start,
  })

  sample({
    source: confirmCodeResendMutation.finished.failure,
    filter: (source) => !!source.error.data,
    fn: (source) => source.error.data!.message,
    target: $errorFieldCode,
  })

  sample({
    clock: submitted,
    source: {
      email: stagesModel.$email,
    },
    fn: (source, clock) => ({
      ...source,
      verify_code: clock.code,
    }),
    target: confirmEmailMutation.start,
  })

  sample({
    clock: confirmEmailMutation.finished.success,
    target: routes.auth.login.open,
  })

  reset({
    clock: [codeResent, submitted, confirmEmailMutation.finished.success],
    target: [
      $errorFieldCode,
    ],
  })

  sample({
    source: confirmEmailMutation.finished.failure,
    filter: (source) => !!source.error.data,
    fn: (source) => {
      if (source.error.data!.errors) {
        const errors = source.error.data!.errors

        return {
          code: errors?.verify_code ? errors.verify_code[0] : null,
        }
      }

      return {
        code: source.error.data!.message,
      }
    },
    target: spread({
      code: $errorFieldCode,
    }),
  })

  return {
    Gate,

    submitted,
    codeResent,

    $formErrors,
    $buttonUnlockedAfterTime,
    $buttonResentIsDisabled,
  }
})
