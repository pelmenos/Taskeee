import { atom } from "shared/lib/factory"
import { combine, createEvent, createStore, restore, sample } from "effector"
import { interval, not, reset, spread } from "patronum"
import { confirmCodeResendMutation, confirmEmailMutation, registerMutation } from "../api"
import { RegisterFormSchema } from "entities/auth/model"
import { createGate } from "effector-react"
import { routes } from "shared/routing"


export type Stage = "register" | "confirm"

export const authRegisterModel = atom(() => {
  const $stage = createStore<Stage>("register")

  const $email = createStore("")

  return {
    $stage,
    $email,
  }
})

export const authRegisterStageRegisterModel = atom(() => {
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
    source: submitted,
    filter: not(registerMutation.$pending),
    fn: (source) => source.email,
    target: authRegisterModel.$email,
  })

  sample({
    clock: registerMutation.finished.success,
    fn: (): Stage => "confirm",
    target: authRegisterModel.$stage,
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
      const errors = source.error.data!.errors

      return {
        errorFieldName: errors?.name ? errors.name[0] : null,
        errorFieldEmail: errors?.email ? errors.email[0] : null,
        errorPassword: errors?.password ? errors.password[0] : null,
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

export const authRegisterStageConfirmModel = atom(() => {
  const Gate = createGate<void>()

  const submitted = createEvent()
  const codeResent = createEvent()

  const codeChanged = createEvent<number>()
  const $code = restore(codeChanged, 0)

  const $errorRoot = createStore<string | null>(null)
  const $errorFieldCode = createStore<string | null>(null)

  const $formErrors = combine({
    root: $errorRoot,
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
      email: authRegisterModel.$email,
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
      verify_code: $code,
      email: authRegisterModel.$email,
    },
    target: confirmEmailMutation.start,
  })

  sample({
    clock: confirmEmailMutation.finished.success,
    target: routes.auth.login.open,
  })

  reset({
    clock: [codeResent, submitted, confirmEmailMutation.finished.success],
    target: [
      $errorRoot,
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
          root: null,
          code: errors?.verify_code ? errors.verify_code[0] : null,
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
    Gate,

    submitted,
    codeChanged,
    codeResent,

    $formErrors,
    $code,
    $buttonUnlockedAfterTime,
    $buttonResentIsDisabled,
  }
})
