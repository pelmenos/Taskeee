import { DynamicallySourcedField , createQuery } from "@farfetched/core";

import { Payload , createRequestInstance } from "./createRequestInstance";

import { API_URL } from "./config"

interface QueryParameters<
  Params,
  Response,
  MappedData,
  InitialData,
> {
  request: Payload<Params>
  response?: {
    mapData?: DynamicallySourcedField<{
      result: Response;
      params: Params;
    }, MappedData | InitialData, void>
  }
  initialData?: InitialData | null;
}

export const createApiQuery = <
  Params,
  Response,
  Error,
  MappedData = Response,
  InitialData = null,
>({
  request,
  response = {},
  initialData = null,
}: QueryParameters<
  Params,
  Response,
  MappedData,
  InitialData
>) => {
  const fx = createRequestInstance<Params, Response, Error>({
    baseURL: API_URL,
    payload: request,
  })

  const query = createQuery({
    effect: fx,
    mapData: response.mapData!,
    initialData: initialData,
  })

  // query.finished.failure.watch(({ error }) => {
  //   console.error(error)
  // })

  return query
}
