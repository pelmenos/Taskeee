import { routes } from "shared/routing"
import { createRouteView } from "atomic-router-react"
import { AuthPasswordRecoveryPage } from "./ui/AuthPasswordRecoveryPage"
import { anonymousRoute } from "./model"


export const AuthPasswordRecoveryRouteView = {
  route: routes.auth.passwordRecovery,
  view: createRouteView({
    route: anonymousRoute,
    view: AuthPasswordRecoveryPage,
  }),
}
