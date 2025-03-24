import {
  ConfirmCodeResendError,
  ConfirmCodeResendSchema, ConfirmCodeResendSuccess, ConfirmEmailError,
  ConfirmEmailSchema,
  LoginFormError,
  LoginFormSchema,
  LoginFormSuccess, PasswordRecoveryConfirmFormError,
  PasswordRecoveryConfirmFormSchema, PasswordRecoveryConfirmFormSuccess, PasswordRecoveryEmailFormError,
  PasswordRecoveryEmailFormSchema, PasswordRecoveryEmailFormSuccess, PasswordRecoveryFormError,
  PasswordRecoveryFormSchema, PasswordRecoveryFormSuccess,
  RegisterFormError,
  RegisterFormSchema, RegisterFormSuccess,
} from "../model"
import { createApiMutation } from "shared/lib/createApiMutation"


export const createLoginMutation = () =>
  createApiMutation<
    LoginFormSchema,
    LoginFormSuccess,
    LoginFormError
  >((params: LoginFormSchema) => ({
    url: "/api/authorization",
    method: "POST",
    body: params,
  }))

export const createRegisterMutation = () =>
  createApiMutation<
    RegisterFormSchema,
    RegisterFormSuccess,
    RegisterFormError
  >((params) => ({
    url: "/api/registration",
    method: "POST",
    body: params,
  }))

export const createConfirmEmailMutation = () =>
  createApiMutation<
    ConfirmEmailSchema,
    void,
    ConfirmEmailError
  >((params) => ({
    url: "/api/registration/verify",
    method: "POST",
    body: params,
  }))

export const createConfirmCodeResendMutation = () =>
  createApiMutation<
    ConfirmCodeResendSchema,
    ConfirmCodeResendSuccess,
    ConfirmCodeResendError
  >((params) => ({
    url: "/api/verify/code/resend",
    method: "POST",
    body: params,
  }))

export const createPasswordRecoveryEmailMutation = () =>
  createApiMutation<
    PasswordRecoveryEmailFormSchema,
    PasswordRecoveryEmailFormSuccess,
    PasswordRecoveryEmailFormError
  >((params) => ({
    url: "/api/password/reset/email",
    method: "POST",
    body: params,
  }))

export const createPasswordRecoveryConfirmMutation = () =>
  createApiMutation<
    PasswordRecoveryConfirmFormSchema,
    PasswordRecoveryConfirmFormSuccess,
    PasswordRecoveryConfirmFormError
  >((params) => ({
    url: "/api/password/reset/verify",
    method: "POST",
    body: params,
  }))

export const createPasswordRecoveryMutation = () =>
  createApiMutation<
    PasswordRecoveryFormSchema,
    PasswordRecoveryFormSuccess,
    PasswordRecoveryFormError
  >((params) => ({
    url: "/api/password/reset",
    method: "POST",
    body: params,
  }))
