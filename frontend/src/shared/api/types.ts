import { arr, obj, or, str, val } from "@withease/contracts"
import { Contract } from "@farfetched/core"

export const createErrorContract = <const Fields extends Array<string>>(fields: Fields) => {
	// const errors = Object.fromEntries(
	// 	fields.map((field) => [field, or(arr(str), val(undefined))]),
	// ) as Record<Fields[number], Contract<unknown, string[] | undefined>>

	const errors = fields.reduce((acc, field) => {
		return {
			...acc,
			[field]: or(arr(str), val(undefined)),
		}
	}, {} as Record<Fields[number], Contract<unknown, Array<string> | undefined>>)

	return obj({
		errors: obj(errors),
	})
}

export const createListContract = <T>(item: Contract<unknown, T>) =>
	obj({
		data: arr(item),
	})

export enum EnumSpaceTariff {
	Pro = "Pro",
	Free = "Free",
	Enterprise = "Enterprise",
}
