import { routes } from "shared/routing"
import { createRouteView } from "atomic-router-react"
import { authRequiredModel } from "./model"
import { AuthRequiredPage } from "./ui/AuthRequiredPage"

export const AuthRequiredRouteView = {
  route: routes.authRequired,
  view: createRouteView({
    route: authRequiredModel.authorizedRoute,
    view: AuthRequiredPage,
  }),
}
