import { routes } from "shared/routing"
import { createRouteView } from "atomic-router-react"
import { ProjectListPage } from "./ui/ProjectListPage"
import { authorizedRoute } from "./model"

export const ProjectListRouteView = {
  route: routes.project.list,
  view: createRouteView({
    route: authorizedRoute,
    view: ProjectListPage,
  }),
}
