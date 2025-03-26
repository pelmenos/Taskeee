import { atom } from "shared/lib/factory"
import { createGate } from "effector-react"

export const mainLayoutModel = atom(() => {
  const Gate = createGate<void>()

  return {
    Gate,

  }
})
