import { fetchFx, httpError, HttpError, networkError, NetworkError } from "@farfetched/core"
import { createEffect } from "effector"
import { formatUrl } from "../lib/formatUrl"
import { formatHeaders } from "../lib/formatHeaders"
import { NetworkRecord } from "../lib/NetworkRecord"
import { mergeQueryStrings, mergeRecords } from "../lib/merge"
import { getSessionFx } from "./authorization"

type RequestBody = Blob | BufferSource | FormData | string
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS"

// type ReplaceUndefinedToNull<T extends object> = { [K in keyof T]-?: T extends Record<K, T[K]> ? T[K] : Exclude<T[K], undefined> | null }

type FactoryParams = {
	baseUrl?: string
	headers?: NetworkRecord
	query?: NetworkRecord | string
}

export type StaticParams = {
	method: HttpMethod
	url: string
	credentials?: RequestCredentials
	abortController?: AbortController
	bodyMapper?: (body: any) => RequestBody
}

export type DynamicParams = {
	query?: NetworkRecord | string
	headers?: NetworkRecord
	body?: any
}

export type RequestParams<Params> = (params: Params) => StaticParams & DynamicParams

export const createRequestBuilder =
	(factoryParams: FactoryParams) =>
	<Params, Data>(requestParams: RequestParams<Params>) =>
		createEffect<
			Params,
			// ReplaceUndefinedToNull<StaticParams> & ReplaceUndefinedToNull<DynamicParams>,
			Data,
			NetworkError | HttpError
		>(async (params) => {
			const {
				method,
				url,
				credentials,
				abortController,
				bodyMapper,

				query,
				headers,
				body,
			} = requestParams(params)

			const mapper = bodyMapper ?? ((body: any) => JSON.stringify(body))

			let mergedHeaders = mergeRecords(factoryParams.headers, headers ?? {})

			const session = await getSessionFx()

			if (session) {
				mergedHeaders = mergeRecords(mergedHeaders, {
					Authorization: `Bearer ${session}`,
				})
			}

			const request = new Request(
				formatUrl(
					factoryParams.baseUrl ?? null,
					url,
					mergeQueryStrings(factoryParams.query, query ?? {}),
				),
				{
					method: method,
					headers: formatHeaders(mergedHeaders),
					credentials: credentials,
					body: mapper(body),
					signal: abortController?.signal,
				},
			)

			const response = await requestFx(request)

			return await response.json()
		})

const requestFx = createEffect<Request, Response, NetworkError | HttpError>(async (request) => {
	const response = await fetchFx(request).catch((cause) => {
		throw networkError({
			reason: cause?.message ?? null,
			cause,
		})
	})

	if (response.status >= 500 || response.status === 401) {
		const res = await response.text().catch(() => null)

		throw httpError({
			status: response.status,
			statusText: response.statusText,
			response: res,
		})
	}

	return response
})
