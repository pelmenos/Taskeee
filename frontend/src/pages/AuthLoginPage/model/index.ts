import { atom } from "shared/lib/factory"
import { combine, createEvent, createStore, sample } from "effector"
import { not, reset, spread } from "patronum"
import { createLoginMutation, LoginFormSchema } from "entities/auth"

import { routes } from "shared/routing"
import { $session, $user } from "shared/api"
import { chainAnonymous } from "shared/session"

export const authLoginModel = atom(() => {
	const currentRoute = routes.auth.login

	const loginMutation = createLoginMutation()

	const anonymousRoute = chainAnonymous({
		route: currentRoute,
		otherwise: routes.home.open,
	})

	const submitted = createEvent<LoginFormSchema>()

	const $errorFieldEmail = createStore<string | null>(null)
	const $errorFieldPassword = createStore<string | null>(null)

	const $formErrors = combine({
		email: $errorFieldEmail,
		password: $errorFieldPassword,
	})

	sample({
		source: submitted,
		filter: not(loginMutation.$pending),
		target: loginMutation.start,
	})

	sample({
		source: loginMutation.finished.success,
		target: routes.project.list.open,
	})

	sample({
		source: loginMutation.finished.success,
		fn: (source) => source.result,
		target: spread({
			user: $user,
			token: $session,
		}),
	})

	reset({
		clock: loginMutation.finished.success,
		target: [$errorFieldEmail, $errorFieldPassword],
	})

	sample({
		source: loginMutation.finished.failure,
		filter: (source) => !!source.error.data,
		fn: (source) => {
			if (source.error.data!.errors) {
				const errors = source.error.data!.errors

				if (errors.auth) {
					return {
						email: errors.auth.at(0) ?? null,
					}
				}

				return {
					email: errors.email?.at(0) ?? null,
					password: errors.password?.at(0) ?? null,
				}
			}

			return {
				email: source.error.data!.message,
				password: null,
			}
		},
		target: spread({
			email: $errorFieldEmail,
			password: $errorFieldPassword,
		}),
	})

	return {
		anonymousRoute,

		loginMutation,

		submitted,

		$formErrors,
	}
})
