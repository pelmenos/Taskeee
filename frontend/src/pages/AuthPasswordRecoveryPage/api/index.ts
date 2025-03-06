import { createMutation } from "@farfetched/core"
import {
  confirmCodeResendFx,
  passwordRecoveryConfirmFx,
  passwordRecoveryEmailFx,
  passwordRecoveryFx,
} from "entities/auth/api"

export const passwordRecoveryEmailMutation = createMutation({
  effect: passwordRecoveryEmailFx(),
})

export const confirmCodeResendMutation = createMutation({
  effect: confirmCodeResendFx(),
})

export const passwordRecoveryConfirmMutation = createMutation({
  effect: passwordRecoveryConfirmFx(),
})

export const passwordRecoveryMutation = createMutation({
  effect: passwordRecoveryFx(),
})
