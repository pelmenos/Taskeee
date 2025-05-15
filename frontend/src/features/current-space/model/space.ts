import {createRoleListQuery, RoleListItem} from "entities/role";
import { atom } from "shared/lib/factory"
import { createEvent, createStore, sample } from "effector"
import { createSpaceListQuery, SpaceListItem } from "entities/space"

import { $status, SessionStatus } from "shared/api"

export const spaceModel = atom(() => {
	const spaceListQuery = createSpaceListQuery()
  const roleListQuery = createRoleListQuery()

	const currentSpaceChanged = createEvent<SpaceListItem>()

	const $availableSpaces = createStore<Array<SpaceListItem>>([])

	const $currentSpace = createStore<SpaceListItem | null>(null)

  const $availableRoles = createStore<Array<RoleListItem>>([])

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
    target: roleListQuery.start,
  })

  sample({
    clock: roleListQuery.finished.success,
    fn: ({result}) => result,
    target: $availableRoles,
  })

	return {
		spaceListQuery,
    roleListQuery,

		currentSpaceChanged,

		$currentSpace,
		$availableSpaces,
    $availableRoles,
	}
})
