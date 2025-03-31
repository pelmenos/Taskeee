import { HomePage } from "./ui"
import { routes } from "shared/routing"
import { createRouteView } from "atomic-router-react"
import { authorizedRoute } from "./model"

export const HomeRouteView = {
  route: routes.home,
  view: createRouteView({
    route: authorizedRoute,
    view: HomePage,
  }),
}
