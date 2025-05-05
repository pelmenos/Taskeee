import { FetchApiRecord } from "@farfetched/core"
import { clearValue } from "./clearValue"
import { recordToUrlSearchParams } from "./recordToUrlSearchParams"

export const mergeRecords = (...records: (FetchApiRecord | undefined | null)[]): FetchApiRecord => {
	const final: Record<string, string | string[]> = {}

	for (const item of records) {
		if (typeof item !== "object") {
			continue
		}
		for (const [key, value] of Object.entries(item || {})) {
			const newCleanValue = clearValue(value)
			if (newCleanValue === null) {
				continue
			}
			if (final[key]) {
				final[key] = [final[key], newCleanValue].flat()
			} else {
				final[key] = newCleanValue
			}
		}
	}

	return final
}

export const mergeQueryStrings = (
	...queryStrings: (FetchApiRecord | string | undefined | null)[]
): string => {
	const final: string[] = []

	for (const item of queryStrings) {
		if (!item) {
			continue
		}

		let curr: string
		if (typeof item !== "string") {
			curr = recordToUrlSearchParams(item).toString()
		} else {
			curr = item
		}
		final.push(curr)
	}

	return final.join("&")
}
