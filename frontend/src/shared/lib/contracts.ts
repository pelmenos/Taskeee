import { Contract } from "@farfetched/core"

export const en = <T extends Record<string, string | number>>(
	e: T,
): Contract<unknown, T[keyof T]> => {
	const values = Object.values(e)

	return {
		isData: (prepared): prepared is T[keyof T] => {
			return values.includes(prepared as string | number)
		},
		getErrorMessages: (prepared) => {
			if (!values.includes(prepared as string | number)) {
				return [`Value must be one of: ${values.join(", ")}, got ${prepared}`]
			}
			return []
		},
	}
}
