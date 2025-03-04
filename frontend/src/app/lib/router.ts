import { createHistoryRouter } from "atomic-router"
import { createRoutesView } from "atomic-router-react"
import { browserHistory, routerControls } from "shared/app"
import { LoginRouteView } from "pages/login"
import { RegisterRouteView } from "pages/register"
import { ConfirmRouteView } from "pages/confirm"
import { PasswordRecoveryRouteView } from "pages/password-recovery"
import { HomeRouteView } from "pages/home"

const routes = [
	{ path: "/", route: HomeRouteView.route },

	{ path: "/auth/login", route: LoginRouteView.route },
	{ path: "/auth/register", route: RegisterRouteView.route },
	{ path: "/auth/confirm", route: ConfirmRouteView.route },
	{ path: "/auth/password-recovery", route: PasswordRecoveryRouteView.route },
]

export const RoutesView = createRoutesView({
	routes: [
		HomeRouteView,

		LoginRouteView,
		RegisterRouteView,
		ConfirmRouteView,
		PasswordRecoveryRouteView,
	],
})

export const router = createHistoryRouter({
	routes: routes,
	controls: routerControls,
})

router.setHistory(browserHistory)
