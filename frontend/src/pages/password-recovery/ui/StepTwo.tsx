import React from "react"
import { Form } from "shared/ui/form"
import { useUnit } from "effector-react/compat"
import { passwordRecoveryModel } from "../model"
import { PinInput } from "shared/ui/pin-input"
import { Button } from "shared/ui/button"

export const StepTwo = () => {
	const { submitted, codeChanged, codeResent, buttonUnlockedAfterTime, buttonResentIsDisabled } =
		useUnit({
			submitted: passwordRecoveryModel.codeSubmitted,
			codeChanged: passwordRecoveryModel.codeChanged,
			codeResent: passwordRecoveryModel.codeResent,
			buttonUnlockedAfterTime: passwordRecoveryModel.$buttonUnlockedAfterTime,
			buttonResentIsDisabled: passwordRecoveryModel.$buttonResentIsDisabled,
		})

	return (
		<Form
			onSubmit={(e) => {
				e.preventDefault()
				submitted()
			}}
		>
			<Form.Title>Восстановление пароля</Form.Title>

			<Form.Text>Код для подтверждения пароля отправлен на ваш E-mail.</Form.Text>

			<Form.FallbackContainer>
				<Form.Text>Не пришел код?</Form.Text>

				<Form.FallbackButton onClick={codeResent} disabled={buttonResentIsDisabled}>
					Отправить еще раз {buttonResentIsDisabled && <span>({buttonUnlockedAfterTime} с.)</span>}
				</Form.FallbackButton>
			</Form.FallbackContainer>

			<Form.FieldContainer>
				<PinInput length={6} onChange={codeChanged} />
			</Form.FieldContainer>

			<Form.FooterContainer>
				<Button type="submit">Следующий шаг</Button>
			</Form.FooterContainer>
		</Form>
	)
}
