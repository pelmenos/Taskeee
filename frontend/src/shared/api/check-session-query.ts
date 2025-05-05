import { sample } from "effector"
import { createApiQuery } from "./createApiQuery"
import { $status, $user, SessionStatus, userContract } from "./authorization"

export const checkSessionQuery = createApiQuery({
	request: () => ({
		url: "/api/user",
		method: "GET",
	}),
	response: {
		contract: userContract,
	},
})

sample({
	clock: checkSessionQuery.finished.success,
	fn: () => SessionStatus.Authenticated,
	target: $status,
})

sample({
	clock: checkSessionQuery.finished.failure,
	fn: () => SessionStatus.Anonymous,
	target: $status,
})

sample({
	clock: checkSessionQuery.finished.success,
	fn: ({ result }) => result,
	target: $user,
})
