import { atom } from "shared/lib/factory"
import { combine, createEvent, createStore, sample, split } from "effector"
import { interval, not, reset, spread } from "patronum"
import { createCodeResendMutation, createPasswordRecoveryConfirmMutation } from "entities/auth"
import { createGate } from "effector-react"
import { mapErrors } from "shared/lib/map-form-errors"
import { PasswordRecoveryFlowStages, stagesModel } from "./stages"

type StageEmailConfirmFields = {
	code: number
}

export const emailConfirmModel = atom(() => {
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

	const passwordRecoveryConfirmMutation = createPasswordRecoveryConfirmMutation()

	const { failureConfirm, successConfirm } = split(
		sample({
			clock: passwordRecoveryConfirmMutation.finished.success,
			fn: ({ result }) => result,
		}),
		{
			failureConfirm: (result) => "errors" in result,
			successConfirm: (result) => "email" in result,
		},
	)

	const Gate = createGate<void>()

	const submitted = createEvent<StageEmailConfirmFields>()

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
		target: spread({ email: $errorFieldCode }),
	})

	sample({
		clock: submitted,
		source: {
			email: stagesModel.$email,
		},
		filter: not(passwordRecoveryConfirmMutation.$pending),
		fn: (source, clock) => ({
			...source,
			verify_code: clock.code,
		}),
		target: passwordRecoveryConfirmMutation.start,
	})

	sample({
		clock: successConfirm,
		target: spread({
			email: stagesModel.$email,
			verify_code: stagesModel.$code,
		}),
	})

	sample({
		clock: successConfirm,
		fn: () => PasswordRecoveryFlowStages.PasswordRecoveryStage,
		target: stagesModel.$stage,
	})

	reset({
		clock: [submitted, successConfirm],
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
