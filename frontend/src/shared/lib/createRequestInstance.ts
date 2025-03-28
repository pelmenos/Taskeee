import { attach, createEffect } from "effector"
import { $session } from "../api"
import { FetchError, FetchOptions, ofetch } from "ofetch"


const getTokenFx = attach({
  source: $session,
  effect: async (token) => token,
})

export const createRequestInstance = <P = RequestInit, R = void, E = void>({
  baseURL,
  payload,
}: Omit<CreateRequestInstanceParams<P>, "url">) =>
  createEffect<P, R, FetchError<E>>(async (params) => {
    const { url, query, headers, ...fetchOptions } = getConfig(payload, params)

    const newHeaders = new Headers(headers)

    newHeaders.set("Accept", "application/json")

    const token = await getTokenFx()

    if (token) {
      newHeaders.set("Authorization", "Bearer " + token)
    }

    return await ofetch(url, {
      ...fetchOptions,
      headers: newHeaders,
      baseURL: baseURL,
    }) as R
  })


type CreateRequestParams = FetchOptions & {
  url: string;
};

type Fn<P> = (params: P) => CreateRequestParams;

export type Payload<P> = CreateRequestParams | Fn<P>;

type CreateRequestInstanceParams<P> = CreateRequestParams & {
  payload: Payload<P>;
};

const getConfig = <P>(payload: Payload<P>, params: P): CreateRequestParams => {
  return typeof payload === "function" ? payload(params) : payload
}
