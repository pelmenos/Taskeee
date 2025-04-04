import { FormLayout } from "widgets/FormLayout"
import { Mail } from "shared/ui/assets/icons/Mail"
import { Password } from "shared/ui/assets/icons/Password"
import { useUnit } from "effector-react"
import "./AuthLoginPage.css"
import React, { useEffect } from "react"
import { routes } from "shared/routing"
import { Checkbox, Group, Stack, Text, Title } from "@mantine/core"
import { Check } from "shared/ui/assets/icons/Check"
import { useForm } from "@mantine/form"
import { Link } from "atomic-router-react"
import { Form } from "shared/ui/Form/Form"
import { FormInput } from "shared/ui/Form/FormInput"
import { FormText } from "shared/ui/Form/FormText"
import { FormSubmit } from "shared/ui/Form/FormSubmit"
import { authLoginModel } from "../model"

export const AuthLoginPage = () => {
	const { setErrors, ...form } = useForm({
		mode: "uncontrolled",
		initialValues: {
			email: "",
			password: "",
			remember_me: false,
		},
	})

	const { submitted, formErrors } = useUnit({
		submitted: authLoginModel.submitted,
		formErrors: authLoginModel.$formErrors,
	})

	useEffect(() => {
		setErrors(formErrors)
	}, [setErrors, formErrors])

	// Serialize remember_me to string
	const handleSubmit = ({ remember_me, ...fields }: typeof form.values) => {
		submitted({
			...fields,
			remember_me: remember_me.toString(),
		})
	}

	return (
		<FormLayout>
			<Form onSubmit={form.onSubmit(handleSubmit)}>
				<Stack gap="lg">
					<Title order={1} size="h1">
						Авторизация
					</Title>

					<Group justify="space-between">
						<FormText>Нет аккаунта?</FormText>

						<Text
							component={Link}
							to={routes.auth.register}
							fz="0.825rem"
							fw={500}
							c="onSurface"
							span
						>
							Создать аккаунт
						</Text>
					</Group>

					<Stack gap="xl">
						<FormInput
							icon={Mail}
							type="text"
							placeholder="Электронная почта"
							key={form.key("email")}
							{...form.getInputProps("email")}
						/>

						<FormInput
							icon={Password}
							type="password"
							placeholder="Пароль"
							key={form.key("password")}
							{...form.getInputProps("password")}
						/>

						<Group justify="space-between">
							<Checkbox
								icon={Check}
								label="Запомнить меня"
								key={form.key("remember_me")}
								{...form.getInputProps("remember_me")}
							/>

							<Text
								component={Link}
								to={routes.auth.passwordRecovery}
								fz="0.825rem"
								fw={500}
								c="onSurface"
								span
							>
								Забыли пароль
							</Text>
						</Group>
					</Stack>

					<FormSubmit mt={32}>Войти в аккаунт</FormSubmit>
				</Stack>
			</Form>
		</FormLayout>
	)
}
