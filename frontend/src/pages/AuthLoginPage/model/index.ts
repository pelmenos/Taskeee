import { atom } from "shared/lib/factory"
import { combine, createEvent, createStore, sample, split } from "effector"
import { not, reset, spread } from "patronum"
import { createLoginMutation, LoginSchema } from "entities/auth"

import { routes } from "shared/routing"
import { $session } from "shared/api"
import { chainAnonymous } from "shared/session"
import { mapErrors } from "shared/lib/map-form-errors"

export const authLoginModel = atom(() => {
	const currentRoute = routes.auth.login

	const loginMutation = createLoginMutation()

	const { failure, success } = split(
		sample({
			clock: loginMutation.finished.success,
			fn: ({ result }) => result,
		}),
		{
			failure: (result) => "errors" in result,
			success: (result) => "token" in result,
		},
	)

	const anonymousRoute = chainAnonymous({
		route: currentRoute,
		otherwise: routes.home.open,
	})

	const submitted = createEvent<LoginSchema>()

	const $errorFieldEmail = createStore<string | null>(null)
	const $errorFieldPassword = createStore<string | null>(null)

	const $formErrors = combine({
		email: $errorFieldEmail,
		password: $errorFieldPassword,
	})

	sample({
		clock: submitted,
		filter: not(loginMutation.$pending),
		target: loginMutation.start,
	})

	sample({
		clock: success,
		target: routes.project.list.open,
	})

	sample({
		clock: success,
		fn: ({ token }) => token,
		target: $session,
	})

	reset({
		clock: loginMutation.finished.success,
		target: [$errorFieldEmail, $errorFieldPassword],
	})

	sample({
		clock: failure,
		fn: ({ errors }) => mapErrors(errors),
		target: spread({
			email: $errorFieldEmail,
			password: $errorFieldPassword,
			auth: $errorFieldEmail,
		}),
	})

	return {
		anonymousRoute,

		loginMutation,

		submitted,

		$formErrors,
	}
})
