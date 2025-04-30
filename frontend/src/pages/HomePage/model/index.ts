import { routes } from "shared/routing"
import { chainAuthorized } from "shared/session"
import { projectModel } from "features/current-space"

export const currentRoute = routes.home

export const authorizedRoute = chainAuthorized({
	route: currentRoute,
	otherwise: routes.auth.login.open,
})

export const $onboardingIsVisible = projectModel.$availableProjects.map((state) => !state.length)
