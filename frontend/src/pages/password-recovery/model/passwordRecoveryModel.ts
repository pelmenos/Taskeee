import { createRoute } from "atomic-router"
import { atom } from "shared/lib/factory.ts"
import { combine, createEvent, createStore, restore, sample } from "effector"
import { debug, interval } from "patronum"
import type { Stage, StepOneFields, StepThreeFields } from "../lib"

export const passwordRecoveryModel = atom(() => {
	const route = createRoute()

	const mailSubmitted = createEvent<StepOneFields>()
	const codeSubmitted = createEvent()
	const passwordSubmitted = createEvent<StepThreeFields>()

	const $stage = createStore<Stage>("one")

	sample({
		clock: mailSubmitted,
		fn: (): Stage => "two",
		target: $stage,
	})

	sample({
		clock: codeSubmitted,
		fn: (): Stage => "three",
		target: $stage,
	})

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
		clock: [mailSubmitted, codeResent],
		fn: () => 20,
		target: $buttonUnlockedAfterTime,
	})

	sample({
		clock: tick,
		source: $buttonUnlockedAfterTime,
		fn: (source) => source - 1,
		target: $buttonUnlockedAfterTime,
	})

	debug(mailSubmitted, codeSubmitted, passwordSubmitted)

	return {
		route,

		mailSubmitted,
		codeSubmitted,
		passwordSubmitted,
		codeChanged,
		codeResent,

		$stage,
		$code,
		$buttonUnlockedAfterTime,
		$buttonResentIsDisabled,
	}
})
