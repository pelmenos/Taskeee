import { createStore, sample } from "effector"
import { persist } from "../lib/local-storage"
import { obj, or, str, val } from "@withease/contracts"
import { debug } from "patronum"

export enum SessionStatus {
  Initial,
  Anonymous,
  Authenticated,
}

export const $status = createStore<SessionStatus>(SessionStatus.Initial)
export const $session = createStore<string>("")
export const $user = createStore<User | null>(null)

debug($status)

// Set anonymous status if token is empty.
sample({
  source: $session,
  filter: (source) => !source,
  fn: () => SessionStatus.Anonymous,
  target: $status,
})

persist({
  key: "session",
  source: $session,
})

export const UserContract = obj({
  id: str,
  name: str,
  email: str,
  email_verified_at: or(str, val(null)),
})

export type User = {
  id: string,
  name: string,
  email: string,
  email_verified_at: string | null
}

