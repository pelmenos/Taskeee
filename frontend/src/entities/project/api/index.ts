import { createApiMutation } from "shared/api/createApiMutation"
import { createApiQuery } from "shared/api/createApiQuery"
import { createListContract } from "shared/api/types"
import {
	createProjectContract,
	CreateProjectSchema,
	projectDetailContract,
	ProjectDetailParams,
	projectListItemContract,
	ProjectListParams,
} from "../model"

export const createCreateProjectMutation = () =>
	createApiMutation({
		request: (params: CreateProjectSchema) => ({
			method: "POST",
			url: "/api/projects",
			body: params,
		}),
		response: {
			contract: createProjectContract,
		},
	})

export const createProjectListQuery = () =>
	createApiQuery({
		request: ({ space_id }: ProjectListParams) => ({
			method: "GET",
			url: `/api/projects?space_id=${space_id}`,
		}),
		response: {
			contract: createListContract(projectListItemContract),
			mapData: ({ result }) => result.data,
		},
	})

export const createProjectDetailQuery = () =>
	createApiQuery({
		request: ({ id }: ProjectDetailParams) => ({
			method: "GET",
			url: `/api/projects/${id}`,
		}),
		response: {
			contract: projectDetailContract,
		},
	})
