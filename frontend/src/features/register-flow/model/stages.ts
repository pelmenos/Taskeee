import { atom } from "shared/lib/factory"
import { createStore } from "effector"

export enum RegisterFlowStages {
  Register = "register",
  Confirm = "confirm",
}

export const stagesModel = atom(() => {
  const $email = createStore("")

  const $currentStage = createStore<RegisterFlowStages>(
    RegisterFlowStages.Register,
  )

  return {

    $currentStage,
    $email,
  }
})
