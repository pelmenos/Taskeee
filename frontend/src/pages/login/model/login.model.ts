import { createRoute } from "atomic-router"
import { atom } from "shared/lib/factory.ts"
import { createEvent } from "effector"
import { debug } from "patronum"
import type { Fields } from "../lib"

export const loginModel = atom(() => {
	const route = createRoute()

	const submitted = createEvent<Fields>()

	debug(submitted)

	return {
		route,

		submitted,
	}
})
