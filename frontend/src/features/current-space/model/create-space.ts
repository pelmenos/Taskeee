import { atom } from "shared/lib/factory"
import { $user, createUploadFileMutation } from "shared/api"
import { combine, createEvent, createStore, restore, sample, split } from "effector"
import { createCreateSpaceMutation, SpaceSchema, SpaceListItem } from "entities/space"

import { not, or, spread } from "patronum"
import { createGate } from "effector-react"
import { update } from "@farfetched/core"
import { mapErrors } from "shared/lib/map-form-errors"
import { spaceModel } from "./space"

type CreateSpaceSchema = {
	name: string
	description: string
	avatar: File | null
}

export const createSpaceModel = atom(() => {
	const Gate = createGate<() => void>()

	const $successCallback = restore(Gate.open, null)

	const uploadFileMutation = createUploadFileMutation()

	const createSpaceMutation = createCreateSpaceMutation()

	const { failure, success } = split(
		sample({
			clock: createSpaceMutation.finished.success,
			fn: ({ result }) => result,
		}),
		{
			failure: (result) => "errors" in result,
			success: (result) => "id" in result,
		},
	)

	const submitted = createEvent<CreateSpaceSchema>()

	const throttleSubmitted = sample({
		source: submitted,
		filter: not(or(uploadFileMutation.$pending, createSpaceMutation.$pending)),
	})

	const fileUploaded = createEvent<string>()

	const $errorFieldName = createStore<string | null>(null)
	const $errorFieldDescription = createStore<string | null>(null)
	const $errorFieldAvatar = createStore<string | null>(null)

	const $formErrors = combine({
		name: $errorFieldName,
		description: $errorFieldDescription,
		avatar: $errorFieldAvatar,
	})

	const $spaceSchema = createStore<Omit<SpaceSchema, "avatar"> | null>(null)

	// Store form schema.
	sample({
		clock: throttleSubmitted,
		source: $user,
		filter: Boolean,
		fn: (user, clock) => ({
			name: clock.name,
			description: clock.description,
			admin_id: user.id,
			tariff: "Pro", // TODO: hardcode <3
		}),
		target: $spaceSchema,
	})

	// If avatar submitted, then upload it.
	sample({
		source: throttleSubmitted,
		filter: (source) => !!source.avatar,
		fn: (source) => source.avatar as File,
		target: uploadFileMutation.start,
	})

	// Else just submit form.
	sample({
		clock: throttleSubmitted,
		filter: (form) => !form.avatar,
		fn: () => "",
		target: fileUploaded,
	})

	sample({
		source: uploadFileMutation.finished.success,
		fn: ({ result }) => result.path,
		target: fileUploaded,
	})

	sample({
		clock: fileUploaded,
		source: $spaceSchema,
		fn: (form, avatar) => ({
			...form!,
			avatar,
		}),
		target: createSpaceMutation.start,
	})

	sample({
		clock: success,
		source: $successCallback,
		fn: (source) => source?.call(null),
	})

	sample({
		source: uploadFileMutation.finished.failure,
		fn: () => "Не удалось загрузить изображение",
		target: $errorFieldAvatar,
	})

	sample({
		clock: failure,
		fn: ({ errors }) => mapErrors(errors),
		target: spread({
			name: $errorFieldName,
			description: $errorFieldDescription,
			avatar: $errorFieldAvatar,
		}),
	})

	update(spaceModel.spaceListQuery, {
		on: createSpaceMutation,
		by: {
			success: ({ query }) => {
				let result: Array<SpaceListItem> = []

				if ("result" in query) {
					result = query.result
				}

				return {
					result: result,
					refetch: true,
				}
			},
		},
	})

	return {
		Gate,

		createSpaceMutation,

		submitted,

		$formErrors,
	}
})
