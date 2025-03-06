import { atom } from "shared/lib/factory"
import { combine, createEvent, createStore, sample } from "effector"
import { interval, not, reset, spread } from "patronum"
import { passwordRecoveryConfirmMutation, passwordRecoveryEmailMutation, passwordRecoveryMutation } from "../api"
import { routes } from "shared/routing"
import { confirmCodeResendMutation } from "../api"


export type StepOneFields = {
  email: string
}

export type StepThreeFields = {
  password: string
}

export type Stage = "one" | "two" | "three"

export const authPasswordRecoveryModel = atom(() => {
  const $stage = createStore<Stage>("one")

  const $email = createStore("")
  const $code = createStore(0)

  return {
    $stage,
    $email,
    $code,
  }
})

export const authPasswordRecoveryStageOneModel = atom(() => {
  const submitted = createEvent<StepOneFields>()

  const $errorRoot = createStore<string | null>(null)
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
    source: submitted,
    filter: not(passwordRecoveryEmailMutation.$pending),
    fn: (source) => source.email,
    target: authPasswordRecoveryModel.$email,
  })

  sample({
    clock: passwordRecoveryEmailMutation.finished.success,
    fn: (): Stage => "two",
    target: authPasswordRecoveryModel.$stage,
  })

  reset({
    clock: [submitted, passwordRecoveryEmailMutation.finished.success],
    target: [
      $errorRoot,
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
          root: null,
          email: errors.email ? errors.email[0] : null,
        }
      }

      return {
        root: source.error.data!.message,
        email: null,
      }
    },
    target: spread({
      root: $errorRoot,
      email: $errorFieldEmail,
    }),
  })

  return {
    submitted,

    $formErrors,
  }
})

export const authPasswordRecoveryStageTwoModel = atom(() => {
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

  sample({
    source: codeChanged,
    filter: not(passwordRecoveryConfirmMutation.$pending),
    target: authPasswordRecoveryModel.$code,
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
    clock: [authPasswordRecoveryStageOneModel.submitted, codeResent],
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
      email: authPasswordRecoveryModel.$email,
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
      email: authPasswordRecoveryModel.$email,
      verify_code: authPasswordRecoveryModel.$code,
    },
    filter: not(passwordRecoveryConfirmMutation.$pending),
    target: passwordRecoveryConfirmMutation.start,
  })

  sample({
    clock: passwordRecoveryConfirmMutation.finished.success,
    fn: (): Stage => "three",
    target: authPasswordRecoveryModel.$stage,
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
    $code: authPasswordRecoveryModel.$code,
    $buttonUnlockedAfterTime,
    $buttonResentIsDisabled,
  }
})

export const authPasswordRecoveryStageThreeModel = atom(() => {
  const submitted = createEvent<StepThreeFields>()

  const $errorRoot = createStore<string | null>(null)
  const $errorFieldPassword = createStore<string | null>(null)

  const $formErrors = combine({
    root: $errorRoot,
    password: $errorFieldPassword,
  })

  sample({
    clock: submitted,
    source: {
      email: authPasswordRecoveryModel.$email,
      verify_code: authPasswordRecoveryModel.$code,
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
      $errorRoot,
      $errorFieldPassword,
    ],
  })

  sample({
    source: passwordRecoveryMutation.finished.failure,
    filter: (source) => !!source.error.data,
    fn: (source) => {
      if (source.error.data!.errors) {
        const errors = source.error.data!.errors

        return {
          root: null,
          password: errors.password ? errors.password[0] : null,
        }
      }

      return {
        root: source.error.data!.message,
        password: null,
      }
    },
    target: spread({
      root: $errorRoot,
      password: $errorFieldPassword,
    }),
  })

  return {
    submitted,
    $formErrors,
  }
})
