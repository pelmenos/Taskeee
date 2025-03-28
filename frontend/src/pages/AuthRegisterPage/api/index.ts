import { createConfirmCodeResendMutation, createConfirmEmailMutation, createRegisterMutation } from "entities/auth/api"


export const registerMutation = createRegisterMutation()
export const confirmCodeResendMutation = createConfirmCodeResendMutation()
export const confirmEmailMutation = createConfirmEmailMutation()
