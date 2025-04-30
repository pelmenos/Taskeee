import { createRouteView } from "atomic-router-react"
import { HomePage } from "./ui"
import { authorizedRoute, currentRoute } from "./model"

export const HomeRouteView = {
	route: currentRoute,
	view: createRouteView({
		route: authorizedRoute,
		view: HomePage,
	}),
}
