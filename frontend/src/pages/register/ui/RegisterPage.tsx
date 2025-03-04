import React from "react"
import { FormLayout } from "widgets/layouts/form-layout"
import { Form } from "shared/ui/form"
import { Mail } from "shared/ui/icons/Mail.tsx"
import { Password } from "shared/ui/icons/Password.tsx"
import { useForm } from "react-hook-form"
import { registerModel } from "../model"
import { useUnit } from "effector-react"
import type { Fields } from "../lib"
import { Button } from "shared/ui/button"

export const RegisterPage = () => {
  const { register, handleSubmit } = useForm<Fields>()

  const { submitted } = useUnit({
    submitted: registerModel.submitted,
  })

  return (
    <FormLayout>
      <Form onSubmit={handleSubmit(submitted)}>
        <Form.Title>Авторизация</Form.Title>

        <Form.FallbackContainer>
          <Form.Text>Уже есть аккаунт?</Form.Text>

          <Form.FallbackLink href="/auth/login">Войти в аккаунт</Form.FallbackLink>
        </Form.FallbackContainer>

        <Form.FieldContainer>
          <Form.Field placeholder="Имя и фамилия" icon={Mail} inputProps={register("fullname")} />

          <Form.Field placeholder="Электронная почта" icon={Mail} inputProps={register("mail")} />

          <Form.Field
            placeholder="Пароль"
            icon={Password}
            inputProps={{
              type: "password",
              ...register("password"),
            }}
          />
        </Form.FieldContainer>

        <Form.FooterContainer>
          <Button type="submit">Создать аккаунт</Button>

          <Form.FooterContainerDivider />

          <Form.Socials />
        </Form.FooterContainer>
      </Form>
    </FormLayout>
  )
}
