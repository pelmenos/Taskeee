export type ResponseWithMessage<Extension = {}> = {
  message: string;
} & Extension

export type ErrorResponse<Schema extends {} = {}> = ResponseWithMessage<{
  errors?: {
    [K in keyof Schema]?: Array<string>
  },
}>

export enum EnumSpaceTariff {
  Pro = "Pro",
  Free = "Free",
  Enterprise = "Enterprise",
}

export enum EnumTaskStatus {

}
