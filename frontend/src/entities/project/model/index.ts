import { arr, obj, or, str, UnContract, val } from "@withease/contracts"
import { userContract } from "shared/api/authorization"
import { createErrorContract } from "shared/api/types"
import { boardListItemContract } from "../../board/model"

export type CreateProjectSchema = {
	space_id: string
	name: string
	description: string
	/** If no members, must be undefined */
	members?: Array<string>
	boards: Array<{
		name: string
		description: string
	}>
}

const createProjectSuccessContract = obj({
	id: str,
	name: str,
	description: or(str, val(null)),
	space_id: str,
	members: arr(userContract),
	boards: arr(boardListItemContract),
	created_at: str,
	updated_at: str,
})

const createProjectFailureContract = createErrorContract([
	"space_id",
	"name",
	"description",
	"members",
	"boards",
])

export const createProjectContract = or(createProjectSuccessContract, createProjectFailureContract)

export type ProjectListParams = {
	space_id: string
}

export const projectListItemContract = obj({
	id: str,
	name: str,
	description: or(str, val(null)),
	// avatar: or(str, val(null)),
	// admin_id: or(str, val(null)),
	// tariff: en(EnumSpaceTariff),
	created_at: str,
})

export type ProjectListItem = UnContract<typeof projectListItemContract>

export type ProjectDetailParams = {
	id: string
}

export const projectDetailContract = obj({
	id: str,
	name: str,
	description: or(str, val(null)),
	space_id: str,
	members: arr(userContract),
	boards: arr(boardListItemContract),
	// tasks: arr(taskListItemContract),
	created_at: str,
	updated_at: str,
})

export type ProjectDetail = UnContract<typeof projectDetailContract>
