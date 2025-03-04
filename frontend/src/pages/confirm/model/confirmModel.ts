import { createRoute } from "atomic-router"
import { atom } from "shared/lib/factory.ts"
import { combine, createEvent, createStore, restore, sample } from "effector"
import { debug, interval } from "patronum"
import { createGate } from "effector-react"

export const confirmModel = atom(() => {
	const route = createRoute()

	const Gate = createGate()

	const submitted = createEvent()

	const codeChanged = createEvent<string>()
	const $code = restore(codeChanged, "")

	const codeResent = createEvent()

	const $buttonUnlockedAfterTime = createStore(0)
	const $buttonResentIsDisabled = combine($buttonUnlockedAfterTime, (source) => !!source)

	const { tick } = interval({
		timeout: 1000,
		start: sample({
			source: $buttonUnlockedAfterTime,
			filter: Boolean,
		}),
		stop: sample({
			source: $buttonUnlockedAfterTime,
			filter: (source) => !source,
		}),
	})

	sample({
		clock: [Gate.open, codeResent],
		fn: () => 20,
		target: $buttonUnlockedAfterTime,
	})

	sample({
		clock: tick,
		source: $buttonUnlockedAfterTime,
		fn: (source) => source - 1,
		target: $buttonUnlockedAfterTime,
	})

	debug(submitted, codeChanged, codeResent)

	return {
		route,
		Gate,

		submitted,
		codeChanged,
		codeResent,

		$code,
		$buttonUnlockedAfterTime,
		$buttonResentIsDisabled,
	}
})
