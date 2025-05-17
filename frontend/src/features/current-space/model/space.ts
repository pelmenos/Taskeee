import {createEvent, createStore, sample} from "effector"
import {createRoleListQuery, RoleListItem} from "entities/role";
import {createSpaceListQuery, MemberListItem, SpaceListItem} from "entities/space"
import {createMembersListQuery} from "entities/space/api";

import {$status, SessionStatus} from "shared/api"
import {atom} from "shared/lib/factory"

export const spaceModel = atom(() => {
  const spaceListQuery = createSpaceListQuery()
  const roleListQuery = createRoleListQuery()
  const memberListQuery = createMembersListQuery()

  const currentSpaceChanged = createEvent<SpaceListItem>()

  const $availableSpaces = createStore<Array<SpaceListItem>>([])

  const $currentSpace = createStore<SpaceListItem | null>(null)

  const $availableRoles = createStore<Array<RoleListItem>>([])

  const $availableMembers = createStore<Array<MemberListItem>>([])

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
    clock: currentSpaceChanged,
    target: $currentSpace,
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

  sample({
    clock: $currentSpace,
    filter: Boolean,
    fn: (currentSpace) => ({
      space_id: currentSpace.id,
    }),
    target: [roleListQuery.start, memberListQuery.start],
  })

  sample({
    clock: roleListQuery.finished.success,
    fn: ({result}) => result,
    target: $availableRoles,
  })

  sample({
    clock: memberListQuery.finished.success,
    fn: ({result}) => result,
    target: $availableMembers,
  })

  return {
    spaceListQuery,
    roleListQuery,
    memberListQuery,

    currentSpaceChanged,

    $currentSpace,
    $availableSpaces,
    $availableRoles,
    $availableMembers,
  }
})
