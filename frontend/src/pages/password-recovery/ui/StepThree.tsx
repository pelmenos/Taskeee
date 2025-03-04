import React from "react"
import { Form } from "shared/ui/form"
import { useForm } from "react-hook-form"
import { useUnit } from "effector-react/compat"
import { passwordRecoveryModel } from "../model"
import { Password } from "shared/ui/icons/Password"
import type { StepThreeFields } from "../lib"
import { Button } from "shared/ui/button"

export const StepThree = () => {
	const { register, handleSubmit } = useForm<StepThreeFields>()

	const { submitted } = useUnit({
		submitted: passwordRecoveryModel.passwordSubmitted,
	})

	return (
		<Form onSubmit={handleSubmit(submitted)}>
			<Form.Title>Восстановление пароля</Form.Title>

			<Form.FieldContainer>
				<Form.Field placeholder="Новый пароль" icon={Password} inputProps={register("password")} />
			</Form.FieldContainer>

			<Form.FooterContainer>
				<Button type="submit">Подтвердить</Button>
			</Form.FooterContainer>
		</Form>
	)
}
