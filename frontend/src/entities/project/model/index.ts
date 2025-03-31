import type { ErrorResponse, ResponseWithMessage, User } from "shared/api"
import type { BoardListItem } from "../../board/model"

export type CreateProjectFormSchema = {
  space_id: string,
  name: string,
  description: string,
  /** If no members, must be undefined */
  members?: Array<string>,
  boards: Array<{
    name: string,
    description: string,
  }>
}

export type ProjectCreateSuccess = {
  id: string;
  name: string;
  description: string;
  space_id: string;
  members: User[];
  boards: BoardListItem[];
  created_at: string;
  updated_at: string;
}

export type ProjectCreateError = ErrorResponse<CreateProjectFormSchema>

export type ProjectListParams = {
  space_id: string,
}

export type ProjectListSuccess = Array<ProjectListItem> | ResponseWithMessage;

export type ProjectListError = ErrorResponse<ProjectListParams>

export type ProjectListItem = {
  id: string;
  name: string;
  description: string;
  avatar: string;
  admin_id: string;
  tariff: string;
  created_at: string;
}

export type ProjectDetailParams = {
  id: string
}

export type ProjectDetailSuccess = Array<ProjectDetail> | ResponseWithMessage;

export type ProjectDetailError = ErrorResponse<ProjectDetailParams>

export type ProjectDetail = {
  id:          string;
  name:        string;
  description: string;
  space_id:    string;
  members:     User[];
  boards:      BoardListItem[];
  tasks:       any[]; // TODO: add type
  created_at:  string;
  updated_at:  string;
}
