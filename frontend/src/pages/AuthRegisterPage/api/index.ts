import { createMutation } from "@farfetched/core"
import { confirmCodeResendFx, confirmEmailFx, registerFx } from "entities/auth/api"


export const registerMutation = createMutation({
  effect: registerFx(),
})

export const confirmCodeResendMutation = createMutation({
  effect: confirmCodeResendFx(),
})

export const confirmEmailMutation = createMutation({
  effect: confirmEmailFx(),
})
