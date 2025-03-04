import React from "react"
import { Form } from "shared/ui/form"
import { Mail } from "shared/ui/icons/Mail.tsx"
import { useForm } from "react-hook-form"
import { useUnit } from "effector-react/compat"
import { passwordRecoveryModel } from "../model"
import type { StepOneFields } from "../lib"
import { Button } from "shared/ui/button"

export const StepOne = () => {
	const { register, handleSubmit } = useForm<StepOneFields>()

	const { submitted } = useUnit({
		submitted: passwordRecoveryModel.mailSubmitted,
	})

	return (
		<Form onSubmit={handleSubmit(submitted)}>
			<Form.Title>Восстановление пароля</Form.Title>

			<Form.Text>Код для подтверждения пароля будет отправлен на ваш E-mail.</Form.Text>

			<Form.FieldContainer>
				<Form.Field placeholder="Электронная почта" icon={Mail} inputProps={register("mail")} />
			</Form.FieldContainer>

			<Form.FooterContainer>
				<Button type="submit">Следующий шаг</Button>
			</Form.FooterContainer>
		</Form>
	)
}
