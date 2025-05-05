import {
	Contract,
	createQuery,
	DynamicallySourcedField,
	HttpError,
	NetworkError,
	unknownContract,
} from "@farfetched/core"
import { sleep } from "../lib/sleep"
import { RequestParams } from "./createRequestBuilder"
import { requestBuilder } from "./config"

const MOCK_ENABLED = false

interface QueryParameters<
	Params,
	Response,
	ContractData extends Response,
	MappedData,
	MapDataSource = void,
> {
	request: RequestParams<Params>
	response?: {
		contract?: Contract<Response, ContractData>
		mapData?: DynamicallySourcedField<
			{
				result: ContractData
				params: Params
			},
			MappedData,
			MapDataSource
		>
		mockedData?: Response
	}
	initialData?: MappedData
}

export const createApiQuery = <
	Params = void,
	Response = unknown,
	ContractData extends Response = Response,
	MappedData = ContractData,
	MapDataSource = void,
>({
	request,
	response,
	initialData,
}: QueryParameters<Params, Response, ContractData, MappedData, MapDataSource>) => {
	const query = createQuery<
		Params,
		Response,
		NetworkError | HttpError,
		ContractData,
		MappedData,
		MapDataSource
	>({
		effect: requestBuilder<Params, Response>(request),
		contract: response?.contract ?? (unknownContract as Contract<Response, ContractData>),
		mapData: response?.mapData ?? (({ result }) => result as unknown as MappedData),
		initialData: initialData ?? null!,
	})

	query.finished.failure.watch(({ error }) => {
		console.error(error)

		if (error?.errorType === "NETWORK") {
			console.log("@NETWORK")
			// TODO: error
		}

		if (error?.errorType === "HTTP") {
			console.log("@HTTP")
			// TODO: error
		}

		if (error?.errorType === "INVALID_DATA") {
			console.log("@INVALID_DATA")
			// TODO: error
		}
	})

	if (response?.mockedData && MOCK_ENABLED) {
		query.__.executeFx.use(async (params: Params) => {
			const config = typeof request === "function" ? request(params) : request

			console.log(`Request ${config.url} mocked`)

			await sleep(500)

			return response.mockedData
		})
	}

	return query
}
