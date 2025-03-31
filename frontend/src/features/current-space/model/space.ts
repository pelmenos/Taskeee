import { atom } from "shared/lib/factory"
import { createStore, sample } from "effector"
import type { SpaceListItem } from "entities/space/model"
import { createSpaceListQuery } from "entities/space/api"
import { $status, SessionStatus } from "shared/api"


export const spaceModel = atom(() => {
  const spaceListQuery = createSpaceListQuery()

  const $availableSpaces = createStore<Array<SpaceListItem>>([])

  const $currentSpace = createStore<SpaceListItem | null>(null)

  sample({
    clock: $status,
    filter: (clock) => clock === SessionStatus.Authenticated,
    target: spaceListQuery.start,
  })

  sample({
    source: spaceListQuery.finished.success,
    filter: (source) => !!source.result,
    fn: (source) => {
      if (!source.result || "message" in source.result) {
        return []
      }

      return source.result
    },
    target: $availableSpaces,
  })

  sample({
    source: {
      available: $availableSpaces,
      current: $currentSpace,
    },
    filter: (source) => !source.current && !!source.available.length,
    fn: (source) => source.available[0],
    target: $currentSpace,
  })

  return {
    spaceListQuery,

    $currentSpace,
    $availableSpaces,
  }
})
