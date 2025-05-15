import {routes} from "shared/routing";
import {chainAuthorized} from "shared/session";

export const currentRoute = routes.team.list

export const authorizedRoute = chainAuthorized({
  route: currentRoute,
  otherwise: routes.auth.login.open,
})
