import { createApiMutation } from "shared/api/createApiMutation"
import {
	confirmResendContract,
	CodeResendSchema,
	confirmEmailContract,
	ConfirmEmailSchema,
	loginContract,
	LoginSchema,
	passwordRecoveryConfirmContract,
	PasswordRecoveryConfirmSchema,
	passwordRecoveryContract,
	passwordRecoveryEmailContract,
	PasswordRecoveryEmailSchema,
	PasswordRecoverySchema,
	registerContract,
	RegisterSchema,
} from "../model"

export const createLoginMutation = () =>
	createApiMutation({
		request: (params: LoginSchema) => ({
			url: "/api/authorization",
			method: "POST",
			body: params,
		}),
		response: {
			contract: loginContract,
		},
	})

export const createRegisterMutation = () =>
	createApiMutation({
		request: (params: RegisterSchema) => ({
			url: "/api/registration",
			method: "POST",
			body: params,
		}),
		response: {
			contract: registerContract,
		},
	})

export const createConfirmEmailMutation = () =>
	createApiMutation({
		request: (params: ConfirmEmailSchema) => ({
			url: "/api/registration/verify",
			method: "POST",
			body: params,
		}),
		response: {
			contract: confirmEmailContract,
		},
	})

export const createCodeResendMutation = () =>
	createApiMutation({
		request: (params: CodeResendSchema) => ({
			url: "/api/verify/code/resend",
			method: "POST",
			body: params,
		}),
		response: {
			contract: confirmResendContract,
		},
	})

export const createPasswordRecoveryEmailMutation = () =>
	createApiMutation({
		request: (params: PasswordRecoveryEmailSchema) => ({
			url: "/api/password/reset/email",
			method: "POST",
			body: params,
		}),
		response: {
			contract: passwordRecoveryEmailContract,
		},
	})

export const createPasswordRecoveryConfirmMutation = () =>
	createApiMutation({
		request: (params: PasswordRecoveryConfirmSchema) => ({
			url: "/api/password/reset/verify",
			method: "POST",
			body: params,
		}),
		response: {
			contract: passwordRecoveryConfirmContract,
		},
	})

export const createPasswordRecoveryMutation = () =>
	createApiMutation({
		request: (params: PasswordRecoverySchema) => ({
			url: "/api/password/reset",
			method: "POST",
			body: params,
		}),
		response: {
			contract: passwordRecoveryContract,
		},
	})
