import { routes } from "shared/routing"
import { createRouteView } from "atomic-router-react"
import { ProjectDetailPage } from "./ui/ProjectDetailPage"
import { authorizedRoute } from "./model"

export const ProjectDetailRouteView = {
  route: routes.project.detail,
  view: createRouteView<void, { id: string }, {}>({
    route: authorizedRoute,
    view: ProjectDetailPage,
  }),
}
