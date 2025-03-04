import React from "react"
import { FormLayout } from "widgets/layouts/form-layout"
import { Form } from "shared/ui/form"
import { Mail } from "shared/ui/icons/Mail"
import { Password } from "shared/ui/icons/Password"
import "./LoginPage.css"
import { useForm } from "react-hook-form"
import { loginModel } from "../model"
import { useUnit } from "effector-react"
import type { Fields } from "../lib"
import { Button } from "shared/ui/button"

export const LoginPage = () => {
	const { register, handleSubmit } = useForm<Fields>()

	const { submitted } = useUnit({
		submitted: loginModel.submitted,
	})

	return (
		<FormLayout className="login-page">
			<Form onSubmit={handleSubmit(submitted)}>
				<Form.Title>Авторизация</Form.Title>

				<Form.FallbackContainer>
					<Form.Text>Нет аккаунта?</Form.Text>

					<Form.FallbackLink href="/auth/register">Создать аккаунт</Form.FallbackLink>
				</Form.FallbackContainer>

				<Form.FieldContainer>
					<Form.Field placeholder="Электронная почта" icon={Mail} inputProps={register("mail")} />

					<Form.Field
						placeholder="Пароль"
						icon={Password}
						inputProps={{
							type: "password",
							...register("password"),
						}}
					/>

					<div className="remember-field">
						<Form.CheckBox label="Запомнить меня" inputProps={register("remember")} />

						<a href="/auth/password-recovery" className="forget-password">
							Забыли пароль
						</a>
					</div>
				</Form.FieldContainer>

				<Form.FooterContainer>
					<Button type="submit">Войти в аккаунт</Button>

					<Form.FooterContainerDivider />

					<Form.Socials />
				</Form.FooterContainer>
			</Form>
		</FormLayout>
	)
}
