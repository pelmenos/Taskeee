import {bool, obj, or, str, UnContract, val} from "@withease/contracts";
import {createErrorContract} from "shared/api/types";


export type CreateRoleSchema = {
  space_id: string
  name: string
  description: string
  permissions: Record<"finance_access" | "projects_access" | "team_access" | "full_access", boolean>
}

const createRoleSuccessContract = obj({
  id: str
})

const createRoleFailureContract = createErrorContract(["name", "description"])

export const createRoleContract = or(createRoleSuccessContract, createRoleFailureContract)

export type RoleListSchema = {
  space_id: string;
}

export const roleListItemContract = obj({
  id: str,
  space_id: str,
  name: str,
  description: or(str, val(null)),
  permissions: obj({
    finance_access: bool,
    projects_access: bool,
    team_access: bool,
    full_access: bool,
  }),
  created_at: str,
})

export type RoleListItem = UnContract<typeof roleListItemContract>
