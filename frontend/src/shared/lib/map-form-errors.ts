import { FetchError } from "ofetch"
import { ErrorResponse } from "../api"

// IDK how this function works,
// and I advise you not to think about it.
export const mapFormError = <
  T extends {},
>(
  { error }: { error: FetchError<ErrorResponse<T>> },
  constructor: (message: string) => {
    [K in keyof ErrorResponse<T>["errors"]]?: string | null
  },
) => {
  const networkError = constructor("NETWORK_ERROR")

  if (!error.data) {
    return networkError
  }

  if (error.data.errors) {

    const entries = Object.keys(networkError)
      .map((key) => {
        const errs = error.data!.errors![key as keyof typeof networkError] as undefined | Array<string>

        return [key, errs?.at(0) ?? null]
      })

    return Object.fromEntries(entries) as Record<keyof T, string | null>
  }

  return constructor(error.data.message)
}
