import { routes } from "shared/routing"
import { chainAuthorized } from "shared/session"
import { sample } from "effector"
import { projectModel } from "features/current-space"

const currentRoute = routes.project.detail;

export const authorizedRoute = chainAuthorized({
  route: currentRoute,
  otherwise: routes.auth.login.open,
})

sample({
  source: authorizedRoute.opened,
  fn: (source) => source.params,
  target: projectModel.currentProjectChanged,
})
