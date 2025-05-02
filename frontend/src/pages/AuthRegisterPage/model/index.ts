import { reset } from "patronum"
import { routes } from "shared/routing"
import { stagesModel } from "features/register-flow"
import { chainAnonymous } from "shared/session"

const currentRoute = routes.auth.register

export const anonymousRoute = chainAnonymous({
	route: currentRoute,
	otherwise: routes.home.open,
})

reset({
	clock: currentRoute.opened,
	target: [stagesModel.$email, stagesModel.$currentStage],
})
