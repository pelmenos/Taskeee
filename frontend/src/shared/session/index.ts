import { createEvent, createStore } from "effector"
import { User } from "entities/user/model"
import { persist } from "../lib/local-storage"

export const logouted = createEvent()

export const $token = createStore<string | null>(null).reset(logouted)

export const $user = createStore<User | null>(null).reset(logouted)

persist({
  source: $token,
  key: "token",
})

persist({
  source: $user,
  key: "user",
})
