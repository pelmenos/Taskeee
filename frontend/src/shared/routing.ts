import {createRoute, createRouterControls} from "atomic-router"

export const controls = createRouterControls()

export const routes = {
  home: createRoute(),

  auth: {
    login: createRoute(),
    register: createRoute(),
    passwordRecovery: createRoute(),
  },

  project: {
    list: createRoute(),
    detail: createRoute<{ id: string }>(),
  },

  team: {
    list: createRoute(),
  },
} as const
