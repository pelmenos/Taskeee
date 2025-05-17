import {createApiMutation} from "shared/api/createApiMutation"
import {createApiQuery} from "shared/api/createApiQuery"
import {createListContract} from "shared/api/types"
import {
  addMemberContract,
  AddMemberSchema,
  createSpaceContract,
  spaceDetailContract,
  SpaceDetailSchema,
  spaceListItemContract,
  SpaceSchema,
  memberListItemContract,
  MembersListSchema,
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
      mapData: ({result}) => result.data,
    },
  })

export const createSpaceDetailQuery = () =>
  createApiQuery({
    request: ({id}: SpaceDetailSchema) => ({
      method: "GET",
      url: `/api/spaces/${id}`,
    }),
    response: {
      contract: spaceDetailContract,
    },
  })

export const createAddMemberMutation = () =>
  createApiMutation({
    request: ({space_id, ...body}: AddMemberSchema) => ({
      method: "POST",
      url: `/api/spaces/${space_id}/invite`,
      body: body,
    }),
    response: {
      contract: addMemberContract,
    }
  })

export const createMembersListQuery = () =>
  createApiQuery({
    request: (schema: MembersListSchema) => ({
      method: "GET",
      url: `/api/spaces/users`,
      query: schema
    }),
    response: {
      contract: createListContract(memberListItemContract),
      mapData: ({result}) => result.data,
      mockedData: {
        data: [
          {
            id: "zxc",
            space_id: "zxc",
            email: "email",
            role_id: "zxc",
            role: {
              id: "zxc",
              space_id: "zxc",
              name: "test",
              description: null,
            }
          },
          {
            id: "zxc",
            space_id: "zxc",
            email: "email",
            role_id: "zxc",
            role: {
              id: "zxc",
              space_id: "zxc",
              name: "test",
              description: null,
            }
          },
          {
            id: "zxc",
            space_id: "zxc",
            email: "email",
            role_id: "zxc",
            role: {
              id: "zxc",
              space_id: "zxc",
              name: "test",
              description: null,
            }
          }
        ]
      }
    }
  })
