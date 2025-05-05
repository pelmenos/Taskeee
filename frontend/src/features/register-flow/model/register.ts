import { atom } from "shared/lib/factory"
import { createRegisterMutation, RegisterSchema } from "entities/auth"

import { combine, createEvent, createStore, sample, split } from "effector"
import { not, reset, spread } from "patronum"
import { mapErrors } from "shared/lib/map-form-errors"
import { RegisterFlowStages, stagesModel } from "./stages"

export const registerModel = atom(() => {
	const registerMutation = createRegisterMutation()

	const { failure, success } = split(
		sample({
			clock: registerMutation.finished.success,
			fn: ({ result }) => result,
		}),
		{
			failure: (result) => "errors" in result,
			success: (result) => "email" in result,
		},
	)

	const submitted = createEvent<RegisterSchema>()

	const $errorFieldName = createStore<string | null>(null)
	const $errorFieldEmail = createStore<string | null>(null)
	const $errorPassword = createStore<string | null>(null)

	const $formErrors = combine({
		name: $errorFieldName,
		email: $errorFieldEmail,
		password: $errorPassword,
	})

	sample({
		clock: submitted,
		filter: not(registerMutation.$pending),
		target: registerMutation.start,
	})

	sample({
		source: success,
		fn: ({ email }) => email,
		target: stagesModel.$email,
	})

	sample({
		clock: success,
		fn: () => RegisterFlowStages.Confirm,
		target: stagesModel.$currentStage,
	})

	reset({
		clock: [success, submitted],
		target: [$errorFieldName, $errorFieldEmail, $errorPassword],
	})

	sample({
		clock: failure,
		fn: ({ errors }) => mapErrors(errors),
		target: spread({
			name: $errorFieldName,
			email: $errorFieldEmail,
			password: $errorPassword,
		}),
	})

	return {
		submitted,

		$formErrors,
	}
})
