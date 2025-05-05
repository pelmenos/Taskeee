import { createApiMutation } from "shared/api/createApiMutation"
import { createApiQuery } from "shared/api/createApiQuery"
import { boardDetailContract, BoardDetailParams, BoardSchema, createBoardContract } from "../model"

export const createCreateBoardMutation = () =>
	createApiMutation({
		request: (params: BoardSchema) => ({
			method: "POST",
			url: "/api/boards",
			body: params,
		}),
		response: {
			contract: createBoardContract,
		},
	})

export const createBoardDetailQuery = () =>
	createApiQuery({
		request: ({ id }: BoardDetailParams) => ({
			method: "GET",
			url: `/api/boards/${id}`,
		}),
		response: {
			contract: boardDetailContract,
		},
	})
