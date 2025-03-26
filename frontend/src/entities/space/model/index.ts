import { ErrorResponse, ResponseWithMessage } from "shared/api"

export type SpaceFormSchema = {
  name: string;
  description: string;
  avatar: string;
  admin_id: string;
  tariff: string;
}

export type SpaceCreateSuccess = Omit<SpaceDetail, "deleted_at">

export type SpaceCreateError = ErrorResponse<SpaceFormSchema>

export type SpaceListSuccess = Array<SpaceListItem> | ResponseWithMessage;

export type SpaceListItem = {
  id:          string;
  name:        string;
  description: string;
  avatar:      string;
  admin_id:    string;
  tariff:      string;
  created_at:  string;
}

export type SpaceDetailFormSchema = {
  id: string,
}

export type SpaceDetail = {
  id:          string;
  name:        string;
  description: string;
  avatar:      string;
  admin_id:    string;
  tariff:      string;
  created_at:  string;
  updated_at:  string;
  deleted_at:  null;
}

export type SpaceDetailSuccess = SpaceDetail | ResponseWithMessage;

export type SpaceDetailError = ErrorResponse
