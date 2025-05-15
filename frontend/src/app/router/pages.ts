import {createHistoryRouter} from "atomic-router";
import {createRoutesView} from "atomic-router-react"
import {sample} from "effector";
import {createBrowserHistory} from "history";
import {AuthLoginRouteView} from "pages/AuthLoginPage"
import {AuthPasswordRecoveryRouteView} from "pages/AuthPasswordRecoveryPage"
import {AuthRegisterRouteView} from "pages/AuthRegisterPage"
import {HomeRouteView} from "pages/HomePage"
import {ProjectDetailRouteView} from "pages/ProjectDetailPage"
import {ProjectListRouteView} from "pages/ProjectListPage"
import {TeamListRouteView} from "pages/TeamListPage";
import {appStarted} from "shared/app";
import {controls, routes} from "shared/routing";

export const router = createHistoryRouter({
  controls,
  routes: [
    {path: "/auth/login", route: routes.auth.login},
    {path: "/auth/register", route: routes.auth.register},
    {path: "/auth/password-recovery", route: routes.auth.passwordRecovery},

    {path: "/project/list", route: routes.project.list},
    {path: "/project/detail/:id", route: routes.project.detail},

    {path: "/team/list", route: routes.team.list},

    {path: "/", route: routes.home},
  ],
})

export const Pages = createRoutesView({
  routes: [
    AuthLoginRouteView,
    AuthPasswordRecoveryRouteView,
    AuthRegisterRouteView,

    ProjectListRouteView,
    ProjectDetailRouteView,

    TeamListRouteView,

    HomeRouteView,
  ],
})

sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
})
