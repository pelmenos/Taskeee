import { atom } from "shared/lib/factory"
import { createStore } from "effector"

export enum PasswordRecoveryFlowStages {
  EmailStage = "email",
  EmailConfirmStage = "email-confirm",
  PasswordRecoveryStage = "password-recovery",
}

export const stagesModel = atom(() => {
  const $stage = createStore(PasswordRecoveryFlowStages.EmailStage)

  const $email = createStore("")
  const $code = createStore(0)

  return {
    $stage,

    $email,
    $code,
  }
})
