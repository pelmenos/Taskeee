import { atom } from "shared/lib/factory"
import { routes } from "shared/routing"
import { chainAuthorized } from "shared/session"


export const authRequiredModel = atom(() => {
  const currentRoute = routes.authRequired

  const authorizedRoute = chainAuthorized({
    route: currentRoute,
    otherwise: routes.auth.login.open,
  })

  return {
    authorizedRoute,
  }
})
