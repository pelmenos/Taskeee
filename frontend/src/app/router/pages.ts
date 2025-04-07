import { createRoutesView } from "atomic-router-react"
import { AuthLoginRouteView } from "pages/AuthLoginPage"
import { AuthPasswordRecoveryRouteView } from "pages/AuthPasswordRecoveryPage"
import { AuthRegisterRouteView } from "pages/AuthRegisterPage"
import { ProjectListRouteView } from "pages/ProjectListPage"
import { ProjectDetailRouteView } from "pages/ProjectDetailPage"

export const Pages = createRoutesView({
	routes: [
		AuthLoginRouteView,
		AuthPasswordRecoveryRouteView,
		AuthRegisterRouteView,

		ProjectListRouteView,
		ProjectDetailRouteView,
	],
})
