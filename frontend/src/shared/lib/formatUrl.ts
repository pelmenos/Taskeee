import { configurationError } from "@farfetched/core"
import { recordToUrlSearchParams } from "./recordToUrlSearchParams"
import { NetworkRecord } from "./NetworkRecord"

export const formatUrl = (
	baseUrl: string | null,
	url: string,
	queryRecord: NetworkRecord | string,
): URL => {
	let urlBase = baseUrl ?? undefined
	let finalUrl = url

	if (!baseUrl && url.startsWith("/")) {
		urlBase = window.location.origin
	}

	// Если есть baseUrl и url начинается с /, объединяем их правильно
	if (urlBase && url.startsWith("/")) {
		const base = new URL(urlBase)
		// Сохраняем путь из baseUrl
		const basePath = base.pathname.replace(/\/+$/, "") // Удаляем trailing slashes
		finalUrl = basePath + url
		urlBase = base.origin // Используем только origin для базового URL
	}

	let queryString: string

	if (typeof queryRecord === "string") {
		queryString = queryRecord
	} else {
		queryString = recordToUrlSearchParams(queryRecord).toString()
	}

	if (queryString) {
		finalUrl = `${finalUrl}?${queryString}`
	}

	/**
	 * Workararound for Safari 14.0
	 * @see https://github.com/igorkamyshev/farfetched/issues/528
	 */
	const urlArgs = [finalUrl, urlBase].filter(Boolean) as [string, string]

	try {
		return new URL(...urlArgs)
	} catch (e) {
		throw configurationError({
			reason: "Invalid URL",
			validationErrors: [`"${finalUrl}" is not valid URL`],
		})
	}
}
