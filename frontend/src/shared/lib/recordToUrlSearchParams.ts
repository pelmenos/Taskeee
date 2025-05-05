import { clearValue } from "./clearValue"

import { NetworkRecord } from "./NetworkRecord"

export const recordToUrlSearchParams = (record: NetworkRecord): URLSearchParams => {
	const params = new URLSearchParams()

	for (const [key, value] of Object.entries(record)) {
		const cleanValue = clearValue(value)
		if (Array.isArray(cleanValue)) {
			for (const v of cleanValue) {
				params.append(key, v)
			}
		} else if (cleanValue !== null) {
			params.append(key, cleanValue)
		}
	}

	return params
}
