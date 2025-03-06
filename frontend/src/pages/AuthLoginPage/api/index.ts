import { createMutation } from "@farfetched/core"
import { loginFx } from "entities/auth/api"


export const loginMutation = createMutation({
  effect: loginFx(),
})
