import { createApiQuery } from "shared/lib/createApiQuery"
import {
  SpaceCreateError,
  SpaceCreateSuccess,
  SpaceDetailError,
  SpaceDetailFormSchema,
  SpaceDetailSuccess,
  SpaceFormSchema,
  SpaceListSuccess,
} from "../model"
import { createApiMutation } from "shared/lib/createApiMutation"

export const createCreateSpaceMutation = () =>
  createApiMutation<
    SpaceFormSchema,
    SpaceCreateSuccess,
    SpaceCreateError
  >((params) => ({
    method: "POST",
    url: "/api/spaces",
    body: params,
  }))

export const createSpaceListQuery = () =>
  createApiQuery<
    void,
    SpaceListSuccess,
    SpaceCreateError
  >({
    request: {
      method: "GET",
      url: "/api/spaces",
    },
  })

export const createSpaceDetailQuery = () =>
  createApiQuery<
    SpaceDetailFormSchema,
    SpaceDetailSuccess,
    SpaceDetailError
  >({
    request: ({ id }) => ({
      method: "GET",
      url: `/api/spaces/${id}`,
    }),
  })
