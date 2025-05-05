import { attach, createEffect, createEvent, createStore, sample } from "effector"
import { reset } from "patronum"
import { obj, str, val, or, UnContract } from "@withease/contracts"
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

export const getSessionFx = attach({
	source: $session,
	effect: createEffect((session: string) => session),
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

export const userContract = obj({
	id: str,
	name: str,
	avatar: or(str, val(null)),
	email: str,
	email_verified_at: or(str, val(null)),
})

export type User = UnContract<typeof userContract>
