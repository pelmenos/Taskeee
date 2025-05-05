import { createRequestBuilder } from "./createRequestBuilder"

export const requestBuilder = createRequestBuilder({
	baseUrl: window.location.origin,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
})
