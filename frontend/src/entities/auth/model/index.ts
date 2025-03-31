import { ErrorResponse, ResponseWithMessage, User } from "shared/api"

export type LoginFormSchema = {
  email: string,
  password: string,
  remember_me: string,
}

export type LoginFormSuccess = ResponseWithMessage<{
  token: string,
  user: User,
}>

export type LoginFormError = ErrorResponse<LoginFormSchema>

export type RegisterFormSchema = {
  name: string
  email: string
  password: string
}

export type RegisterFormSuccess = ResponseWithMessage<{
  email: string,
}>

export type RegisterFormError = ErrorResponse<RegisterFormSchema>


export type ConfirmEmailSchema = {
  email: string,
  verify_code: number,
}

export type ConfirmEmailError = ErrorResponse<PasswordRecoveryConfirmFormSchema>


export type PasswordRecoveryEmailFormSchema = {
  email: string
}

export type ConfirmCodeResendSchema = {
  email: string,
}

export type ConfirmCodeResendSuccess = ResponseWithMessage

export type ConfirmCodeResendError = ErrorResponse<PasswordRecoveryEmailFormSchema>

export type PasswordRecoveryEmailFormSuccess = ResponseWithMessage<{
  email: string
}>

export type PasswordRecoveryEmailFormError = ErrorResponse<PasswordRecoveryEmailFormSchema>

export type PasswordRecoveryConfirmFormSchema = {
  email: string,
  verify_code: number,
}

export type PasswordRecoveryConfirmFormSuccess = ResponseWithMessage<{
  verify_code: number,
  email: string,
}>

export type PasswordRecoveryConfirmFormError = ErrorResponse<PasswordRecoveryConfirmFormSchema>

export type PasswordRecoveryFormSchema = {
  email: string,
  password: string,
  verify_code: number,
}

export type PasswordRecoveryFormSuccess = ResponseWithMessage

export type PasswordRecoveryFormError = ErrorResponse<PasswordRecoveryFormSchema>
