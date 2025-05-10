import {arr, obj, or, str, UnContract, val} from "@withease/contracts"
import {createErrorContract} from "shared/api/types"
import {taskListItemContract} from "../../task/model"

export type BoardSchema = {
  project_id: string
  name: string
  description: string
}

const createBoardSuccessContract = obj({
  id: str,
  name: str,
  description: or(str, val(null)),
  project_id: str,
  created_at: str,
  updated_at: str,
})

const createBoardFailureContract = createErrorContract(["project_id", "name", "description"])

export const createBoardContract = or(createBoardSuccessContract, createBoardFailureContract)

export const boardListItemContract = obj({
  id: str,
  name: str,
  tasks: arr(taskListItemContract),
  description: or(str, val(null)),
  project_id: str,
  created_at: str,
  updated_at: str,
})

export type BoardListItem = UnContract<typeof boardListItemContract>

export type BoardDetailParams = {
  id: string
}

export const boardDetailContract = obj({
  id: str,
  name: str,
  description: or(str, val(null)),
  project_id: str,
  tasks: arr(taskListItemContract),
  created_at: str,
  updated_at: str,
})

export type BoardDetail = UnContract<typeof boardDetailContract>
