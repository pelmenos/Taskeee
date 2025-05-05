import { atom } from "shared/lib/factory"
import { combine, createEvent, createStore, sample, split } from "effector"
import { not, reset, spread } from "patronum"
import { routes } from "shared/routing"
import { createPasswordRecoveryMutation } from "entities/auth"
import { mapErrors } from "shared/lib/map-form-errors"
import { stagesModel } from "./stages"

export type StagePasswordRecoveryFields = {
	password: string
}

export const passwordRecoveryModel = atom(() => {
	const passwordRecoveryMutation = createPasswordRecoveryMutation()

	const { failure, success } = split(
		sample({
			clock: passwordRecoveryMutation.finished.success,
			fn: ({ result }) => result,
		}),
		{
			failure: (result) => "errors" in result,
			success: (result) => "email" in result,
		},
	)

	const submitted = createEvent<StagePasswordRecoveryFields>()

	const $errorFieldPassword = createStore<string | null>(null)

	const $formErrors = combine({
		password: $errorFieldPassword,
	})

	sample({
		clock: submitted,
		source: {
			email: stagesModel.$email,
			verify_code: stagesModel.$code,
		},
		filter: not(passwordRecoveryMutation.$pending),
		fn: (source, clock) => ({
			...source,
			...clock,
		}),
		target: passwordRecoveryMutation.start,
	})

	sample({
		clock: success,
		target: routes.auth.login.open,
	})

	reset({
		clock: [submitted, success],
		target: [$errorFieldPassword],
	})

	sample({
		clock: failure,
		fn: ({ errors }) => mapErrors(errors),
		target: spread({
			password: $errorFieldPassword,
		}),
	})

	return {
		submitted,

		$formErrors,
	}
})
