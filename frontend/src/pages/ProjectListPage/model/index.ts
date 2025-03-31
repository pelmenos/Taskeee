import { routes } from "shared/routing"
import { chainAuthorized } from "shared/session"

const currentRoute = routes.project.list

export const authorizedRoute = chainAuthorized({
  route: currentRoute,
  otherwise: routes.auth.login.open,
})
