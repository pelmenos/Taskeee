import {createRouteView} from "atomic-router-react";
import {authorizedRoute, currentRoute} from "./model";
import {TeamListPage} from "./ui/TeamListPage";

export const TeamListRouteView = {
  route: currentRoute,
  view: createRouteView({
    route: authorizedRoute,
    view: TeamListPage,
  }),
}
