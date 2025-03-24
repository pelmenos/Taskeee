import { routes } from "shared/routing"
import { AuthLoginPage } from "./ui/AuthLoginPage"
import { createRouteView } from "atomic-router-react"
import { authLoginModel } from "./model"


export const AuthLoginRouteView = {
  route: routes.auth.login,
  view: createRouteView({
    route: authLoginModel.anonymousRoute,
    view: AuthLoginPage,
  }),
}
