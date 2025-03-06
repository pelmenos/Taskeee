import { useForm } from "react-hook-form"
import { RegisterFormSchema } from "entities/auth/model"
import { useUnit } from "effector-react"
import { authRegisterStageRegisterModel } from "../model"
import React, { useEffect } from "react"
import { Form } from "shared/ui/Form"
import { FormTitle } from "shared/ui/Form/FormTitle"
import { FormFallbackContainer } from "shared/ui/Form/FormFallbackContainer"
import { FormText } from "shared/ui/Form/FormText"
import { FormFallbackLink } from "shared/ui/Form/FormFallbackLink"
import { routes } from "shared/routing"
import { FormFieldContainer } from "shared/ui/Form/FormFieldContainer"
import { FormField } from "shared/ui/Form/FormField"
import { Mail } from "shared/ui/Icons/Mail"
import { Password } from "shared/ui/Icons/Password"
import { FormFooterContainer } from "shared/ui/Form/FormFooterContainer"
import { Button } from "shared/ui/Button"
import { FormFooterContainerDivider } from "shared/ui/Form/FormFooterContainerDivider"
import { FormSocials } from "shared/ui/Form/FormSocials"

export const StageRegister = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormSchema>()

  const {
    submitted,
    formErrors,
  } = useUnit({
    submitted: authRegisterStageRegisterModel.submitted,
    formErrors: authRegisterStageRegisterModel.$formErrors,
  })

  useEffect(() => {
    Object.entries(formErrors).forEach(([field, error]) =>
      error && setError(field as keyof RegisterFormSchema, { message: error }),
    )
  }, [setError, formErrors])
  return (
    <Form onSubmit={handleSubmit(submitted)}>
      <FormTitle>Авторизация</FormTitle>

      <FormFallbackContainer>
        <FormText>Уже есть аккаунт?</FormText>

        <FormFallbackLink to={routes.auth.login}>Войти в аккаунт</FormFallbackLink>
      </FormFallbackContainer>

      <FormFieldContainer>
        <FormField placeholder="Имя и фамилия" icon={Mail} inputProps={register("name")} />

        {errors.name && (<span>{errors.name.message}</span>)}

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

      </FormFieldContainer>

      <FormFooterContainer>
        <Button type="submit">Создать аккаунт</Button>

        <FormFooterContainerDivider />

        <FormSocials />
      </FormFooterContainer>
    </Form>
  )
}
