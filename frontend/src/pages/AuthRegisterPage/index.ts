import { routes } from "shared/routing"
import { AuthRegisterPage } from "./ui/AuthRegisterPage"
import { createRouteView } from "atomic-router-react"
import { anonymousRoute } from "./model"


export const AuthRegisterRouteView = {
  route: routes.auth.register,
  view: createRouteView({
    route: anonymousRoute,
    view: AuthRegisterPage,
  }),
}
