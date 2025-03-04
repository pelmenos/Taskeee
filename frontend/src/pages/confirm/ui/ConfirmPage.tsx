import React from "react"
import { FormLayout } from "widgets/layouts/form-layout"
import { Form } from "shared/ui/form"
import { confirmModel } from "../model"
import { useGate, useUnit } from "effector-react"
import { PinInput } from "shared/ui/pin-input"
import { Button } from "shared/ui/button"

export const ConfirmPage = () => {
	const { submitted, codeChanged, codeResent, buttonUnlockedAfterTime, buttonResentIsDisabled } =
		useUnit({
			submitted: confirmModel.submitted,
			codeChanged: confirmModel.codeChanged,
			codeResent: confirmModel.codeResent,
			buttonUnlockedAfterTime: confirmModel.$buttonUnlockedAfterTime,
			buttonResentIsDisabled: confirmModel.$buttonResentIsDisabled,
		})

	useGate(confirmModel.Gate)

	return (
		<FormLayout className="login-page">
			<Form
				onSubmit={(e) => {
					e.preventDefault()
					submitted()
				}}
			>
				<Form.Title>Подтверждение аккаунта</Form.Title>

				<Form.Text>Код для подтверждения пароля отправлен на ваш E-mail.</Form.Text>

				<Form.FallbackContainer>
					<Form.Text>Не пришел код?</Form.Text>

					<Form.FallbackButton onClick={codeResent} disabled={buttonResentIsDisabled}>
						Отправить еще раз{" "}
						{buttonResentIsDisabled && <span>({buttonUnlockedAfterTime} с.)</span>}
					</Form.FallbackButton>
				</Form.FallbackContainer>

				<Form.FieldContainer>
					<PinInput length={6} onChange={(val) => codeChanged(val)} />
				</Form.FieldContainer>

				<Form.FooterContainer>
					<Button type="submit">Подтвердить аккаунт</Button>
				</Form.FooterContainer>
			</Form>
		</FormLayout>
	)
}
