import { sample } from "effector"
import { createApiQuery } from "../lib/createApiQuery"
import { User , $status, $user, SessionStatus } from "./authorization";


export const checkSessionQuery =
  createApiQuery<void, User, void>({
    request: {
      url: "/api/user",
      method: "GET",
    },
  })

sample({
  clock: checkSessionQuery.finished.success,
  fn: () => SessionStatus.Authenticated,
  target: $status,
})

sample({
  clock: checkSessionQuery.finished.failure,
  fn: () => SessionStatus.Anonymous,
  target: $status,
})

sample({
  source: checkSessionQuery.finished.success,
  fn: (source) => source.result,
  target: $user,
})
