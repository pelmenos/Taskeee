export type ResponseWithMessage<Extension = {}> = {
  message: string;
} & Extension

export type ErrorResponse<Schema extends {} = {}> = ResponseWithMessage<{
  errors?: {
    [K in keyof Schema]?: Array<string>
  },
}>
