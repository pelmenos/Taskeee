import { createEvent, createStore, sample } from "effector"
import { reset } from "patronum"
import { persist } from "../lib/local-storage"

export enum SessionStatus {
	Initial,
	Anonymous,
	Authenticated,
}

export const logouted = createEvent()

export const $status = createStore<SessionStatus>(SessionStatus.Initial)
export const $session = createStore<string>("")
export const $user = createStore<User | null>(null)

reset({
	clock: logouted,
	target: [$status, $session, $user],
})

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

persist({
	key: "user",
	source: $user,
})

export type User = {
	id: string
	name: string
	avatar: string
	email: string
	email_verified_at: string | null
}
