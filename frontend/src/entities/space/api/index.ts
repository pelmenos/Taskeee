import { createApiQuery } from "shared/api/createApiQuery"
import { createApiMutation } from "shared/api/createApiMutation"
import { createListContract } from "shared/api/types"
import {
	createSpaceContract,
	spaceDetailContract,
	SpaceDetailSchema,
	SpaceSchema,
	spaceListItemContract,
} from "../model"

export const createCreateSpaceMutation = () =>
	createApiMutation({
		request: (params: SpaceSchema) => ({
			method: "POST",
			url: "/api/spaces",
			body: params,
		}),
		response: {
			contract: createSpaceContract,
		},
	})

export const createSpaceListQuery = () =>
	createApiQuery({
		request: () => ({
			method: "GET",
			url: "/api/spaces",
		}),
		response: {
			contract: createListContract(spaceListItemContract),
			mapData: ({ result }) => result.data,
		},
	})

export const createSpaceDetailQuery = () =>
	createApiQuery({
		request: ({ id }: SpaceDetailSchema) => ({
			method: "GET",
			url: `/api/spaces/${id}`,
		}),
		response: {
			contract: spaceDetailContract,
		},
	})
