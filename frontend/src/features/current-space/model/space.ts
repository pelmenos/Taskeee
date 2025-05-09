import { atom } from "shared/lib/factory"
import { createEvent, createStore, sample } from "effector"
import { createSpaceListQuery, SpaceListItem } from "entities/space"

import { $status, SessionStatus } from "shared/api"

export const spaceModel = atom(() => {
	const spaceListQuery = createSpaceListQuery()

	const currentSpaceChanged = createEvent<SpaceListItem>()

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

	return {
		spaceListQuery,

		currentSpaceChanged,

		$currentSpace,
		$availableSpaces,
	}
})
