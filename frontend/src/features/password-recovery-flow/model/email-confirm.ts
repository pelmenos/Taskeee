import { atom } from "shared/lib/factory"
import { combine, createEvent, createStore, sample } from "effector"
import { interval, not, reset, spread } from "patronum"
import { createConfirmCodeResendMutation, createPasswordRecoveryConfirmMutation } from "entities/auth/api"
import { emailModel } from "./email"
import { PasswordRecoveryFlowStages, stagesModel } from "./stages"


export const emailConfirmModel = atom(() => {
  const confirmCodeResendMutation = createConfirmCodeResendMutation()
  const passwordRecoveryConfirmMutation = createPasswordRecoveryConfirmMutation()

  const submitted = createEvent()

  const codeChanged = createEvent<number>()
  const codeResent = createEvent()

  const $errorRoot = createStore<string | null>(null)
  const $errorFieldCode = createStore<string | null>(null)

  const $formErrors = combine({
    root: $errorRoot,
    code: $errorFieldCode,
  })

  const $buttonUnlockedAfterTime = createStore(0)
  const $buttonResentIsDisabled = combine($buttonUnlockedAfterTime, (source) => !!source)

  const $code = createStore(0)

  sample({
    source: codeChanged,
    filter: not(passwordRecoveryConfirmMutation.$pending),
    target: $code,
  })

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
    clock: [emailModel.submitted, codeResent],
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
    target: $errorRoot,
  })

  sample({
    clock: submitted,
    source: {
      email: stagesModel.$email,
      verify_code: $code,
    },
    filter: not(passwordRecoveryConfirmMutation.$pending),
    target: passwordRecoveryConfirmMutation.start,
  })

  sample({
    source: passwordRecoveryConfirmMutation.finished.success,
    fn: (source) => source.result,
    target: spread({
      email: stagesModel.$email,
      verify_code: stagesModel.$code,
    }),
  })

  sample({
    clock: passwordRecoveryConfirmMutation.finished.success,
    fn: () => PasswordRecoveryFlowStages.PasswordRecoveryStage,
    target: stagesModel.$stage,
  })

  reset({
    clock: [submitted, passwordRecoveryConfirmMutation.finished.success],
    target: [
      $errorRoot,
      $errorFieldCode,
    ],
  })

  sample({
    source: passwordRecoveryConfirmMutation.finished.failure,
    filter: (source) => !!source.error.data,
    fn: (source) => {
      if (source.error.data!.errors) {
        const errors = source.error.data!.errors

        return {
          root: null,
          code: errors.verify_code ? errors.verify_code[0] : null,
        }
      }

      return {
        root: source.error.data!.message,
        code: null,
      }
    },
    target: spread({
      root: $errorRoot,
      code: $errorFieldCode,
    }),
  })

  return {
    submitted,
    codeChanged,
    codeResent,

    $formErrors,
    $code,
    $buttonUnlockedAfterTime,
    $buttonResentIsDisabled,
  }
})
