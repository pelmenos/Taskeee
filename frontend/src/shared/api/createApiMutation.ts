import {
	Contract,
	createMutation,
	HttpError,
	NetworkError,
	unknownContract,
} from "@farfetched/core"
import { sleep } from "../lib/sleep"
import { RequestParams } from "./createRequestBuilder"
import { requestBuilder } from "./config"

const MOCK_ENABLED = false

interface MutationParameters<Params, Data, ContractData extends Data> {
	request: RequestParams<Params>
	response?: {
		contract?: Contract<Data, ContractData>
		mockedData?: ContractData
	}
}

export const createApiMutation = <Params, Data, ContractData extends Data>({
	request,
	response,
}: MutationParameters<Params, Data, ContractData>) => {
	const mutation = createMutation<Params, Data, ContractData, NetworkError | HttpError>({
		effect: requestBuilder<Params, Data>(request),
		contract: response?.contract ?? (unknownContract as Contract<Data, ContractData>),
	})

	mutation.finished.failure.watch(({ error }) => {
		console.error(error)

		if (error?.errorType === "NETWORK") {
			console.log("@NETWORK")
			// TODO: error
		}

		if (error?.errorType === "HTTP") {
			console.log("@HTTP")
			// TODO: error
		}
	})

	if (response?.mockedData && MOCK_ENABLED) {
		mutation.__.executeFx.use(async (params: Params) => {
			const config = typeof request === "function" ? request(params) : request

			console.log(`Request ${config.url} mocked`)

			await sleep(500)

			return response.mockedData
		})
	}

	return mutation
}
