import { atom } from "shared/lib/factory.ts"
import { createRoute } from "atomic-router"

export const homeModel = atom(() => {
	const route = createRoute()

	return {
		route,
	}
})
