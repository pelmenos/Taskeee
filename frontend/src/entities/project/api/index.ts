import { createApiMutation } from "shared/api/createApiMutation"
import { createApiQuery } from "shared/api/createApiQuery"
import { createListContract } from "shared/api/types"
import {
  createProjectContract,
  CreateProjectSchema,
  deleteProjectContract,
  DeleteProjectSchema,
  projectDetailContract,
  ProjectDetailSchema,
  projectListItemContract,
  ProjectListSchema, SearchProjectSchema,
  updateProjectContract,
  UpdateProjectSchema,
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

export const createUpdateProjectMutation = () =>
	createApiMutation({
		request: ({ id, ...body }: UpdateProjectSchema) => ({
			method: "PUT",
			url: `/api/projects/${id}`,
			body: body,
		}),
		response: {
			contract: updateProjectContract,
		},
	})

export const createDeleteProjectMutation = () =>
	createApiMutation({
		request: ({ id }: DeleteProjectSchema) => ({
			method: "DELETE",
			url: `/api/projects/${id}`,
		}),
		response: {
			contract: deleteProjectContract,
		},
	})

export const createProjectListQuery = () =>
	createApiQuery({
		request: (schema: ProjectListSchema) => ({
			method: "GET",
			url: `/api/projects`,
      query: schema
		}),
		response: {
			contract: createListContract(projectListItemContract),
			mapData: ({ result }) => result.data,
		},
	})

export const createSearchProjectQuery = () =>
  createApiQuery({
    request: (schema: SearchProjectSchema) => ({
      method: "GET",
      url: "/api/projects/search",
      query: schema
    }),
    response: {
      contract: createListContract(projectListItemContract),
      mapData: ({ result }) => result.data,
    },
  })

export const createProjectDetailQuery = () =>
	createApiQuery({
		request: ({ id }: ProjectDetailSchema) => ({
			method: "GET",
			url: `/api/projects/${id}`,
		}),
		response: {
			contract: projectDetailContract,
		},
	})
