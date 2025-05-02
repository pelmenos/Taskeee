import { createRouteView } from "atomic-router-react"
import { HomePage } from "./ui/HomePage"
import { authorizedRoute, currentRoute } from "./model"

export const HomeRouteView = {
	route: currentRoute,
	view: createRouteView({
		route: authorizedRoute,
		view: HomePage,
	}),
}
