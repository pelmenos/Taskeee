import { createEffect } from "effector"
import { FetchError, type FetchOptions, ofetch } from "ofetch"
import { $token } from "../session"

type CreateRequestParams = FetchOptions & {
  url: string;
};

type Fn<P> = (params: P) => CreateRequestParams;

type Payload<P> = CreateRequestParams | Fn<P>;

type CreateRequestInstanceParams<P> = CreateRequestParams & {
  payload: Payload<P>;
};

type CreateRequestFxParams = Omit<
  CreateRequestInstanceParams<CreateRequestParams>,
  "payload" | "url"
>;

const getConfig = <P>(payload: Payload<P>, params: P): CreateRequestParams => {
  return typeof payload === "function" ? payload(params) : payload
}

const createRequestInstance = <P = RequestInit, R = void, E = void>({
  baseURL,
  headers,
  payload,
}: CreateRequestInstanceParams<P>) =>
  createEffect<P, R, FetchError<E>>(async (params) => {
    const { url, ...fetchOptions } = getConfig(payload, params)

    const newHeaders = new Headers(headers)

    const token = $token.getState()

    if (token) {
      newHeaders.append(
        "Authorization",
        `Bearer ${token}`,
      )
    }

    // Simulate loading
    // await new Promise(resolve => setTimeout(resolve, 10000));

    return await ofetch(url, {
      ...fetchOptions,
      headers: newHeaders,
      baseURL,
    }) as R
  })

export const createRequestFx =
  (params: CreateRequestFxParams) =>
    <P = CreateRequestParams, R = void, E = void>(payload: Payload<P>) =>
      createRequestInstance<P, R, E>({
        ...(params as CreateRequestParams),
        payload,
      })

export const createInternalRequestFx = createRequestFx({
  baseURL: !import.meta.env.PROD ? import.meta.env.VITE_PUBLIC_API_URL : undefined,
})
