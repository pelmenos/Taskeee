import { ResponseWithMessage } from "../api"

type NormalizeListResponseParams<T> = {
  result: Array<T> | ResponseWithMessage | null
}

export const normalizeListResponse = <T>({result}: NormalizeListResponseParams<T>) =>
  (!result || "message" in result) ? [] as Array<T> : result
