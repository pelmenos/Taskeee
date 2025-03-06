import { createRoutesView } from "atomic-router-react"
import { AuthLoginRouteView } from "./AuthLoginPage"
import { HomeRouteView } from "./HomePage"
import { AuthPasswordRecoveryRouteView } from "./AuthPasswordRecoveryPage"
import { AuthRegisterRouteView } from "./AuthRegisterPage"


export const Pages = createRoutesView({
  routes: [
    AuthLoginRouteView,
    AuthPasswordRecoveryRouteView,
    AuthRegisterRouteView,

    HomeRouteView,
  ],
})
