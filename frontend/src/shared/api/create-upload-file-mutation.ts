import {createApiMutation} from "../lib/createApiMutation";
import {ErrorResponse, ResponseWithMessage} from "./types";

export type UploadFileSuccess = ResponseWithMessage<{
  path: string;
}>

export type UploadFileError = ErrorResponse;

export const createUploadFileMutation = () =>
  createApiMutation<File, UploadFileSuccess, UploadFileError>((file) => {
    const formData = new FormData();

    formData.append("file", file)

    return {
      method: "POST",
      url: "/api/file",
      body: formData,
    }
  })
