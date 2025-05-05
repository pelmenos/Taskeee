import { atom } from "shared/lib/factory"
import { createCodeResendMutation, createConfirmEmailMutation } from "entities/auth"
import { createGate } from "effector-react"
import { combine, createEvent, createStore, sample, split } from "effector"
import { interval, reset, spread } from "patronum"
import { routes } from "shared/routing"
import { mapErrors } from "shared/lib/map-form-errors"
import { stagesModel } from "./stages"

type StageConfirmFields = {
	code: number
}

export const confirmModel = atom(() => {
	const confirmEmailMutation = createConfirmEmailMutation()

	const { failureConfirm, successConfirm } = split(
		sample({
			clock: confirmEmailMutation.finished.success,
			fn: ({ result }) => result,
		}),
		{
			failureConfirm: (result) => "errors" in result,
			successConfirm: (result) => "email" in result,
		},
	)

	const codeResendMutation = createCodeResendMutation()

	const { failureCodeResend } = split(
		sample({
			clock: codeResendMutation.finished.success,
			fn: ({ result }) => result,
		}),
		{
			failureCodeResend: (result) => "errors" in result,
		},
	)

	const Gate = createGate<void>()

	const submitted = createEvent<StageConfirmFields>()
	const codeResent = createEvent()

	const $errorFieldCode = createStore<string | null>(null)

	const $formErrors = combine({
		code: $errorFieldCode,
	})

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

	sample({
		clock: codeResent,
		source: {
			email: stagesModel.$email,
		},
		filter: $buttonResentIsDisabled,
		target: codeResendMutation.start,
	})

	sample({
		clock: failureCodeResend,
		fn: ({ errors }) => mapErrors(errors),
		target: spread({
			email: $errorFieldCode,
		}),
	})

	sample({
		clock: submitted,
		source: {
			email: stagesModel.$email,
		},
		fn: (source, clock) => ({
			...source,
			verify_code: clock.code,
		}),
		target: confirmEmailMutation.start,
	})

	sample({
		clock: successConfirm,
		target: routes.auth.login.open,
	})

	reset({
		clock: [codeResent, submitted, successConfirm],
		target: [$errorFieldCode],
	})

	sample({
		clock: failureConfirm,
		fn: ({ errors }) => mapErrors(errors),
		target: spread({
			verify_code: $errorFieldCode,
		}),
	})

	return {
		Gate,

		submitted,
		codeResent,

		$formErrors,
		$buttonUnlockedAfterTime,
		$buttonResentIsDisabled,
	}
})
