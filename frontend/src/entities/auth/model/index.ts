import { num, obj, or, str, UnContract } from "@withease/contracts"
import { createErrorContract } from "shared/api/types"

const loginSuccessContract = obj({
	token: str,
})

const loginFailureContract = createErrorContract(["email", "password", "remember_me", "auth"])

export const loginContract = or(loginSuccessContract, loginFailureContract)

export type LoginSchema = {
	email: string
	password: string
	remember_me: boolean
}

export type LoginFormSuccess = UnContract<typeof loginSuccessContract>

export type LoginFormError = UnContract<typeof loginFailureContract>

/* ===== Register ===== */

export type RegisterSchema = {
	name: string
	email: string
	password: string
}

const registerSuccessContract = obj({
	email: str,
})

const registerFailureContract = createErrorContract(["name", "email", "password"])

export const registerContract = or(registerSuccessContract, registerFailureContract)

/* ===== Confirm email ===== */

export type ConfirmEmailSchema = {
	email: string
	verify_code: number
}

const confirmEmailSuccessContract = obj({
	// TODO: verify this contract
	email: str,
})

const confirmEmailFailureContract = createErrorContract(["email", "verify_code"])

export const confirmEmailContract = or(confirmEmailSuccessContract, confirmEmailFailureContract)

/* ===== Confirm code resend ===== */

export type CodeResendSchema = {
	email: string
}

const codeResendSuccessContract = obj({
	// TODO: verify this contract
	email: str,
})

const codeResendFailureContract = createErrorContract(["email"])

export const confirmResendContract = or(codeResendSuccessContract, codeResendFailureContract)

/* ===== Password recovery email ===== */

export type PasswordRecoveryEmailSchema = {
	email: string
}

const passwordRecoveryEmailSuccessContract = obj({
	// TODO: verify this contract
	email: str,
})

const passwordRecoveryEmailFailureContract = createErrorContract(["email"])

export const passwordRecoveryEmailContract = or(
	passwordRecoveryEmailSuccessContract,
	passwordRecoveryEmailFailureContract,
)

/* ===== Password recovery confirm ===== */

export type PasswordRecoveryConfirmSchema = {
	email: string
	verify_code: number
}

const passwordRecoveryConfirmSuccessContract = obj({
	verify_code: num,
	email: str,
})

const passwordRecoveryConfirmFailureContract = createErrorContract(["email", "verify_code"])

export const passwordRecoveryConfirmContract = or(
	passwordRecoveryConfirmSuccessContract,
	passwordRecoveryConfirmFailureContract,
)

/* ===== Password recovery ===== */

export type PasswordRecoverySchema = {
	email: string
	password: string
	verify_code: number
}

const passwordRecoverySuccessContract = obj({
	verify_code: num,
	email: str,
})

const passwordRecoveryFailureContract = createErrorContract(["email", "password", "verify_code"])

export const passwordRecoveryContract = or(
	passwordRecoverySuccessContract,
	passwordRecoveryFailureContract,
)
