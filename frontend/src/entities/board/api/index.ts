import { createApiMutation } from "shared/lib/createApiMutation"
import { createApiQuery } from "shared/lib/createApiQuery"
import {
  BoardDetailError,
  BoardDetailParams,
  BoardDetailSuccess,
  BoardFormError,
  BoardFormSchema,
  BoardFormSuccess,
} from "../model"

export const createCreateBoardMutation = () =>
  createApiMutation<
    BoardFormSchema,
    BoardFormSuccess,
    BoardFormError
  >((params) => ({
    method: "POST",
    url: "/api/boards",
    body: params,
  }))

export const createBoardDetailQuery = () =>
  createApiQuery<
    BoardDetailParams,
    BoardDetailSuccess,
    BoardDetailError
  >({
    request: (params) => ({
      method: "GET",
      url: `/api/boards/${params.id}`,
    }),
  })
