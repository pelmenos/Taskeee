import {createMutation} from "@farfetched/core";
import {createRequestInstance, Payload} from "./createRequestInstance";
import {API_URL} from "./config";

export const createApiMutation = <
  Params,
  Response,
  Error,
>(params: Payload<Params>) => {
  const fx = createRequestInstance<Params, Response, Error>({
    baseURL: API_URL,
    payload: params,
  })

  const mutation = createMutation({
    effect: fx,
  })

  mutation.finished.failure.watch(({error}) => {
    console.error(error);
  });

  return mutation
}
