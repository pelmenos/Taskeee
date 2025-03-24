import { RouteInstance, RouteParams } from "atomic-router"
import { Effect, EventCallable } from "effector"

export type ChainParams<Params extends RouteParams> = {
  route: RouteInstance<Params>
  otherwise?: EventCallable<void> | Effect<void, any, any>;
}
