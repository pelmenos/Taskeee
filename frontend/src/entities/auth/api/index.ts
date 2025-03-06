import { createInternalRequestFx } from "shared/api"
import {
  ConfirmCodeResendError, ConfirmCodeResendSchema,
  ConfirmCodeResendSuccess, ConfirmEmailError, ConfirmEmailSchema,
  LoginFormError,
  LoginFormSchema,
  LoginFormSuccess,
  PasswordRecoveryConfirmFormError,
  PasswordRecoveryConfirmFormSchema,
  PasswordRecoveryConfirmFormSuccess,
  PasswordRecoveryEmailFormError,
  PasswordRecoveryEmailFormSchema,
  PasswordRecoveryEmailFormSuccess,
  PasswordRecoveryFormError,
  PasswordRecoveryFormSchema,
  PasswordRecoveryFormSuccess,
  RegisterFormError,
  RegisterFormSchema,
} from "../model"


export const loginFx = () =>
  createInternalRequestFx<LoginFormSchema, LoginFormSuccess, LoginFormError>((params) => ({
    url: "/api/authorization",
    method: "POST",
    body: params,
  }))

export const registerFx = () =>
  createInternalRequestFx<RegisterFormSchema, void, RegisterFormError>((params) => ({
    url: "/api/registration",
    method: "POST",
    body: params,
  }))

export const confirmEmailFx = () =>
  createInternalRequestFx<ConfirmEmailSchema, void, ConfirmEmailError>((params) => ({
    url: "/api/registration/verify",
    method: "POST",
    body: params,
  }))

export const confirmCodeResendFx = () =>
  createInternalRequestFx<ConfirmCodeResendSchema, ConfirmCodeResendSuccess, ConfirmCodeResendError>((params) => ({
    url: "/api/verify/code/resend",
    method: "POST",
    body: params,
  }))

export const passwordRecoveryEmailFx = () =>
  createInternalRequestFx<PasswordRecoveryEmailFormSchema, PasswordRecoveryEmailFormSuccess, PasswordRecoveryEmailFormError>((params) => ({
    url: "/api/password/reset/email",
    method: "POST",
    body: params,
  }))

export const passwordRecoveryConfirmFx = () =>
  createInternalRequestFx<PasswordRecoveryConfirmFormSchema, PasswordRecoveryConfirmFormSuccess, PasswordRecoveryConfirmFormError>((params) => ({
    url: "/api/password/reset/verify",
    method: "POST",
    body: params,
  }))

export const passwordRecoveryFx = () =>
  createInternalRequestFx<PasswordRecoveryFormSchema, PasswordRecoveryFormSuccess, PasswordRecoveryFormError>((params) => ({
    url: "/api/password/reset",
    method: "POST",
    body: params,
  }))
