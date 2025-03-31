import { createApiMutation } from "shared/lib/createApiMutation"
import { createApiQuery } from "shared/lib/createApiQuery"
import {
  CreateProjectFormSchema,
  ProjectCreateError,
  ProjectCreateSuccess,
  ProjectDetailError,
  ProjectDetailParams,
  ProjectDetailSuccess,
  ProjectListParams,
  ProjectListSuccess,
} from "../model"

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
