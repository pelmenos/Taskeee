import {createApiMutation} from "shared/api/createApiMutation";
import {createApiQuery} from "shared/api/createApiQuery";
import {createListContract} from "shared/api/types";
import {createRoleContract, CreateRoleSchema, roleListItemContract, RoleListSchema} from "../model";

export const createCreateRoleMutation = () =>
  createApiMutation({
    request: (schema: CreateRoleSchema) => ({
      method: "POST",
      url: "/api/spaces/roles",
      body: schema,
    }),
    response: {
      contract: createRoleContract,
    }
  })

export const createRoleListQuery = () =>
  createApiQuery({
    request: (schema: RoleListSchema) => ({
      method: "GET",
      url: "/api/spaces/roles",
      query: schema,
    }),
    response: {
      contract: createListContract(roleListItemContract),
      mapData: ({result}) => result.data,
    }
  })
