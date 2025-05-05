import { EnumSpaceTariff } from "shared/api"
import { obj, or, str, UnContract, val } from "@withease/contracts"
import { en } from "shared/lib/contracts"
import { createErrorContract } from "shared/api/types"

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
