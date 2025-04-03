import { RouteInstance, RouteParams } from "atomic-router"
import { Effect, EventCallable } from "effector"

export type ChainParams<Params extends RouteParams> = {
  route: RouteInstance<Params>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  otherwise?: EventCallable<void> | Effect<void, any, any>;
}
