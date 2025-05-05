import { FetchApiRecord } from "@farfetched/core"
import { clearValue } from "./clearValue"

export const formatHeaders = (headersRecord: FetchApiRecord): Headers => {
	const headers = new Headers()

	for (const [key, value] of Object.entries(headersRecord)) {
		const cleanValue = clearValue(value)

		if (Array.isArray(cleanValue)) {
			for (const v of cleanValue) {
				headers.append(key, v)
			}
		} else if (cleanValue !== null) {
			headers.append(key, cleanValue)
		}
	}

	return headers
}
