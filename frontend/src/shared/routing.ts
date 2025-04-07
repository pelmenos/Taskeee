import { createHistoryRouter, createRoute, createRouterControls } from "atomic-router"
import { createBrowserHistory } from "history"
import { sample } from "effector"
import { appStarted } from "./app"

export const controls = createRouterControls()

export const routes = {
	auth: {
		login: createRoute(),
		register: createRoute(),
		passwordRecovery: createRoute(),
	},

	project: {
		list: createRoute(),
		detail: createRoute<{ id: string }>(),
	},
} as const

export const router = createHistoryRouter({
	routes: [
		{ path: "/auth/login", route: routes.auth.login },
		{ path: "/auth/register", route: routes.auth.register },
		{ path: "/auth/password-recovery", route: routes.auth.passwordRecovery },

		{ path: "/project/list", route: routes.project.list },
		{ path: "/project/detail/:id", route: routes.project.detail },
	],
	controls,
})

sample({
	clock: appStarted,
	fn: () => createBrowserHistory(),
	target: router.setHistory,
})
