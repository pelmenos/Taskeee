import { ChainParams } from "./types"
import { chainRoute, RouteParams, RouteParamsAndQuery } from "atomic-router"
import { createEvent, EventCallable, sample } from "effector"
import { not } from "patronum"
import { $status, SessionStatus } from "../api"
import { checkSessionQuery } from "../api/check-session-query"

// sample({
//   clock: appStarted,
//   target: checkSessionQuery.start,
// })

export const chainAuthorized = <Params extends RouteParams>({ route, otherwise }: ChainParams<Params>) => {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>()
  const sessionReceivedAnonymous = createEvent<RouteParamsAndQuery<Params>>()

  const alreadyAuthenticated = sample({
    clock: sessionCheckStarted,
    source: $status,
    filter: (status) => status === SessionStatus.Authenticated,
  })

  const alreadyAnonymous = sample({
    clock: sessionCheckStarted,
    source: $status,
    filter: (status) => status === SessionStatus.Anonymous,
  })

  sample({
    clock: sessionCheckStarted,
    filter: not(checkSessionQuery.$pending),
    target: checkSessionQuery.start,
  })

  sample({
    clock: [alreadyAnonymous, checkSessionQuery.finished.failure],
    filter: route.$isOpened,
    source: { params: route.$params, query: route.$query },
    target: sessionReceivedAnonymous,
  })

  if (otherwise) {
    sample({
      clock: sessionReceivedAnonymous,
      target: otherwise as EventCallable<void>,
    })
  }

  return chainRoute({
    route: route,
    beforeOpen: sessionCheckStarted,
    openOn: [alreadyAuthenticated, checkSessionQuery.finished.success],
    cancelOn: sessionReceivedAnonymous,
  })
}


export const chainAnonymous = <Params extends RouteParams>({ route, otherwise }: ChainParams<Params>) => {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>()
  const sessionReceivedAuthenticated = createEvent<RouteParamsAndQuery<Params>>()

  const alreadyAuthenticated = sample({
    clock: sessionCheckStarted,
    source: $status,
    filter: (status) => status === SessionStatus.Authenticated,
  })

  const alreadyAnonymous = sample({
    clock: sessionCheckStarted,
    source: $status,
    filter: (status) => status === SessionStatus.Anonymous,
  })

  sample({
    clock: sessionCheckStarted,
    filter: not(checkSessionQuery.$pending),
    target: checkSessionQuery.start,
  })

  sample({
    clock: [alreadyAuthenticated, checkSessionQuery.finished.success],
    filter: route.$isOpened,
    source: { params: route.$params, query: route.$query },
    target: sessionReceivedAuthenticated,
  })

  if (otherwise) {
    sample({
      clock: sessionReceivedAuthenticated,
      target: otherwise as EventCallable<void>,
    })
  }

  return chainRoute({
    route: route,
    beforeOpen: sessionCheckStarted,
    openOn: [alreadyAnonymous, checkSessionQuery.finished.failure],
    cancelOn: sessionReceivedAuthenticated,
  })
}
