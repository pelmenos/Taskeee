import { createRoutesView } from "atomic-router-react"
import { AuthLoginRouteView } from "./AuthLoginPage"
import { HomeRouteView } from "./HomePage"
import { AuthPasswordRecoveryRouteView } from "./AuthPasswordRecoveryPage"
import { AuthRegisterRouteView } from "./AuthRegisterPage"
import { AuthRequiredRouteView } from "./AuthRequired"
import {ProjectListRouteView} from "./ProjectListPage";
import { ProjectDetailRouteView } from "./ProjectDetailPage"


export const Pages = createRoutesView({
  routes: [
    AuthLoginRouteView,
    AuthPasswordRecoveryRouteView,
    AuthRegisterRouteView,

    AuthRequiredRouteView,

    ProjectListRouteView,
    ProjectDetailRouteView,

    HomeRouteView,
  ],
})
