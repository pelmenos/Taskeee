import { createHistoryRouter, createRoute, createRouterControls } from "atomic-router"
import { appStarted } from "./app"
import { createBrowserHistory } from "history"
import { sample } from "effector"


export const controls = createRouterControls()

export const routes = {
  home: createRoute(),

  authRequired: createRoute(),

  auth: {
    login: createRoute(),
    register: createRoute(),
    passwordRecovery: createRoute(),
  },

  project: {
    list: createRoute(),
    detail: createRoute<{id: string}>()
  }

} as const

export const router = createHistoryRouter({
  routes: [
    { path: "/auth/login", route: routes.auth.login },
    { path: "/auth/register", route: routes.auth.register },
    { path: "/auth/password-recovery", route: routes.auth.passwordRecovery },

    { path: "/auth/required", route: routes.authRequired },

    { path: "/project/list", route: routes.project.list},
    { path: "/project/detail/:id", route: routes.project.detail},

    { path: "/", route: routes.home },
  ],
  controls,
})

sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
})
