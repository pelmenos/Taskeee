import { routes } from "shared/routing"
import { createRouteView } from "atomic-router-react"
import { AuthLoginPage } from "./ui/AuthLoginPage"
import { authLoginModel } from "./model"


export const AuthLoginRouteView = {
  route: routes.auth.login,
  view: createRouteView({
    route: authLoginModel.anonymousRoute,
    view: AuthLoginPage,
  }),
}
