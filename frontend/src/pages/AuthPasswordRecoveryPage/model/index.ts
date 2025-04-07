import { routes } from "shared/routing"
import { chainAnonymous } from "shared/session"

const currentRoute = routes.auth.passwordRecovery

export const anonymousRoute = chainAnonymous({
	route: currentRoute,
	otherwise: routes.project.list.open,
})
