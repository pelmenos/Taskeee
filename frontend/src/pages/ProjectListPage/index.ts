import {routes} from "shared/routing";
import {ProjectListPage} from "./ui/ProjectListPage";

export {ProjectListPage} from "./ui/ProjectListPage"

export const ProjectListRouteView = {
  route: routes.project.list,
  view: ProjectListPage,
}
