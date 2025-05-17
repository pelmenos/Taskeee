import {obj, or, str, UnContract, val} from "@withease/contracts"
import {EnumSpaceTariff} from "shared/api"
import {createErrorContract} from "shared/api/types"
import {en} from "shared/lib/contracts"

export type SpaceSchema = {
  name: string
  description: string
  avatar: string
  admin_id: string
  tariff: string
}

const createSpaceSuccessContract = obj({
  id: str,
  name: str,
  description: or(str, val(null)),
  avatar: or(str, val(null)),
  admin_id: str,
  tariff: en(EnumSpaceTariff),
  created_at: str,
  updated_at: str,
})

const createSpaceFailureContract = createErrorContract([
  "name",
  "description",
  "avatar",
  "admin_id",
  "tariff",
])

export const createSpaceContract = or(createSpaceSuccessContract, createSpaceFailureContract)

export const spaceListItemContract = obj({
  id: str,
  name: str,
  description: or(str, val(null)),
  avatar: or(str, val(null)),
  admin_id: str,
  tariff: en(EnumSpaceTariff),
  created_at: str,
})

export type SpaceListItem = UnContract<typeof spaceListItemContract>

export type SpaceDetailSchema = {
  id: string
}

export const spaceDetailContract = obj({
  id: str,
  name: str,
  description: or(str, val(null)),
  avatar: or(str, val(null)),
  admin_id: str,
  tariff: en(EnumSpaceTariff),
  created_at: str,
  updated_at: str,
  deleted_at: or(str, val(null)),
})

export type SpaceDetail = UnContract<typeof spaceDetailContract>

export type AddMemberSchema = {
  space_id: string,
  role_id: string,
  email: string,
}

const addMemberSuccessContract = obj({
  message: val('Приглашение успешно отправлено')
})

const addMemberFailureContract = createErrorContract(['email', "role_id"])

export const addMemberContract = or(addMemberSuccessContract, addMemberFailureContract)

export type MembersListSchema = {
  space_id: string
}

export const memberListItemContract = obj({
  id: str,
  space_id: str,
  email: str,
  role_id: str,
  role: obj({
    id: str,
    space_id: str,
    name: str,
    description: or(str, val(null)),
  }),
})

export type MemberListItem = UnContract<typeof memberListItemContract>
