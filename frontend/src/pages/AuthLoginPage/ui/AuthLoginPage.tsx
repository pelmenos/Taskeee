import { FormLayout } from "widgets/layouts/form-layout"
import { Form } from "shared/ui/Form"
import { Mail } from "shared/ui/Icons/Mail"
import { Password } from "shared/ui/Icons/Password"
import { useForm } from "react-hook-form"
import { authLoginModel } from "../model"
import { useUnit } from "effector-react"
import { Button } from "shared/ui/Button"
import "./AuthLoginPage.css"
import React, { useEffect } from "react"
import { FormTitle } from "shared/ui/Form/FormTitle"
import { FormFallbackContainer } from "shared/ui/Form/FormFallbackContainer"
import { FormText } from "shared/ui/Form/FormText"
import { FormFallbackLink } from "shared/ui/Form/FormFallbackLink"
import { FormFieldContainer } from "shared/ui/Form/FormFieldContainer"
import { routes } from "shared/routing"
import { FormField } from "shared/ui/Form/FormField"
import { FormCheckBox } from "shared/ui/Form/FormCheckBox"
import { FormFooterContainer } from "shared/ui/Form/FormFooterContainer"
import { FormFooterContainerDivider } from "shared/ui/Form/FormFooterContainerDivider"
import { FormSocials } from "shared/ui/Form/FormSocials"
import { Link } from "atomic-router-react"
import { LoginFormSchema } from "entities/auth/model"


export const AuthLoginPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormSchema>()

  const {
    submitted,
    formErrors,
  } = useUnit({
    submitted: authLoginModel.submitted,
    formErrors: authLoginModel.$formErrors,
  })

  useEffect(() => {
    Object.entries(formErrors).forEach(([field, error]) =>
      error && setError(field as keyof LoginFormSchema, {message: error})
    )
  }, [setError, formErrors])

  // Serialize remember_me to string
  const onSubmit = handleSubmit((data) => submitted({
    ...data,
    remember_me: data.remember_me.toString(),
  }))

  return (
    <FormLayout className="login-page">
      <Form onSubmit={onSubmit}>
        <FormTitle>Авторизация</FormTitle>

        <FormFallbackContainer>
          <FormText>Нет аккаунта?</FormText>

          <FormFallbackLink to={routes.auth.register}>Создать аккаунт</FormFallbackLink>
        </FormFallbackContainer>

        <FormFieldContainer>
          {errors.root && (<span>{errors.root.message}</span>)}

          <FormField placeholder="Электронная почта" icon={Mail} inputProps={register("email")} />

          {errors.email && (<span>{errors.email.message}</span>)}

          <FormField
            placeholder="Пароль"
            icon={Password}
            inputProps={{
              type: "password",
              ...register("password"),
            }}
          />

          {errors.password && (<span>{errors.password.message}</span>)}

          <div className="remember-field">
            <FormCheckBox label="Запомнить меня" inputProps={register("remember_me")} />

            <Link to={routes.auth.passwordRecovery} className="forget-password">
              Забыли пароль
            </Link>
          </div>
        </FormFieldContainer>

        <FormFooterContainer>
          <Button type="submit">Войти в аккаунт</Button>

          <FormFooterContainerDivider />

          <FormSocials />
        </FormFooterContainer>
      </Form>
    </FormLayout>
  )
}
