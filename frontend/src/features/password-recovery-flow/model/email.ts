import { atom } from "shared/lib/factory"
import { combine, createEvent, createStore, sample, split } from "effector"
import { not, reset, spread } from "patronum"
import { createPasswordRecoveryEmailMutation } from "entities/auth"
import { mapErrors } from "shared/lib/map-form-errors"
import { PasswordRecoveryFlowStages, stagesModel } from "./stages"

export type StageEmailFields = {
	email: string
}

export const emailModel = atom(() => {
	const passwordRecoveryEmailMutation = createPasswordRecoveryEmailMutation()

	const { failure, success } = split(
		sample({
			clock: passwordRecoveryEmailMutation.finished.success,
			fn: ({ result }) => result,
		}),
		{
			failure: (result) => "errors" in result,
			success: (result) => "email" in result,
		},
	)

	const submitted = createEvent<StageEmailFields>()

	const $errorFieldEmail = createStore<string | null>(null)

	const $formErrors = combine({
		email: $errorFieldEmail,
	})

	sample({
		clock: submitted,
		filter: not(passwordRecoveryEmailMutation.$pending),
		target: passwordRecoveryEmailMutation.start,
	})

	sample({
		clock: success,
		fn: ({ email }) => email,
		target: stagesModel.$email,
	})

	sample({
		clock: success,
		fn: () => PasswordRecoveryFlowStages.EmailConfirmStage,
		target: stagesModel.$stage,
	})

	reset({
		clock: [submitted, success],
		target: [$errorFieldEmail],
	})

	sample({
		clock: failure,
		fn: ({ errors }) => mapErrors(errors),
		target: spread({
			email: $errorFieldEmail,
		}),
	})

	return {
		submitted,

		$formErrors,
	}
})
