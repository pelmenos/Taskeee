import { createApiMutation } from "shared/lib/createApiMutation"
import type {
  ProjectCreateError,
  ProjectCreateSuccess,
  ProjectDetailError,
  ProjectDetailParams,
  ProjectDetailSuccess,
  CreateProjectFormSchema,
  ProjectListParams,
  ProjectListSuccess,
} from "../model"
import { createApiQuery } from "shared/lib/createApiQuery"

export const createCreateProjectMutation = () =>
  createApiMutation<
    CreateProjectFormSchema,
    ProjectCreateSuccess,
    ProjectCreateError
  >((params) => ({
    method: "POST",
    url: "/api/projects",
    body: params,
  }))

export const createProjectListQuery = () =>
  createApiQuery<
    ProjectListParams,
    ProjectListSuccess,
    void
  >({
    request: ({space_id}) => ({
      method: "GET",
      url: `/api/projects?space_id=${space_id}`,
    }),
  })

export const createProjectDetailQuery = () =>
  createApiQuery<
    ProjectDetailParams,
    ProjectDetailSuccess,
    ProjectDetailError
  >({
    request: ({ id }) => ({
      method: "GET",
      url: `/api/projects/${id}`,
    }),
  })
