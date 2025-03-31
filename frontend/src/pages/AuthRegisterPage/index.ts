import { routes } from "shared/routing"
import { createRouteView } from "atomic-router-react"
import { AuthRegisterPage } from "./ui/AuthRegisterPage"
import { anonymousRoute } from "./model"


export const AuthRegisterRouteView = {
  route: routes.auth.register,
  view: createRouteView({
    route: anonymousRoute,
    view: AuthRegisterPage,
  }),
}
