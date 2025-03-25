import { FormLayout } from "widgets/layouts/form-layout"
import { Mail } from "shared/ui/assets/icons/Mail"
import { Password } from "shared/ui/assets/icons/Password"
import { authLoginModel } from "../model"
import { useUnit } from "effector-react"
import "./AuthLoginPage.css"
import React, { useEffect } from "react"
import { routes } from "shared/routing"
import { Checkbox, Group, Stack, Text, Title } from "@mantine/core"
import { FormSocials } from "shared/ui/Form/FormSocials"
import { Check } from "shared/ui/assets/icons/Check"
import { useForm } from "@mantine/form"
import { Link } from "atomic-router-react"
import { Form } from "shared/ui/Form/Form"
import { FormInput } from "shared/ui/Form/FormInput"
import { FormText } from "shared/ui/Form/FormText"
import { FormDivider } from "shared/ui/Form/FormDivider"
import { FormSubmit } from "shared/ui/Form/FormSubmit"


export const AuthLoginPage = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
      remember_me: false,
    },
  })

  const {
    submitted,
    formErrors,
  } = useUnit({
    submitted: authLoginModel.submitted,
    formErrors: authLoginModel.$formErrors,
  })

  useEffect(() => {
    form.setErrors(formErrors)
  }, [formErrors])

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
          <Title
            order={1}
            ff="Montserrat, serif"
            fz={{
              base: "2rem",
              "512px": "1.5rem",
            }}
          >
            Авторизация
          </Title>

          <Group justify="space-between">
            <FormText>
              Нет аккаунта?
            </FormText>

            <Link
              style={{ textDecoration: "none" }}
              to={routes.auth.register}>
              <Text
                fz="0.825rem"
                fw={500}
                c="onSurface"
                span
              >
                Создать аккаунт
              </Text>
            </Link>
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

              <Link
                style={{ textDecoration: "none" }}
                to={routes.auth.passwordRecovery}
              >
                <FormText fw={500}>
                  Забыли пароль
                </FormText>
              </Link>
            </Group>
          </Stack>

          <Stack
            mt="2rem"
            gap="xl"
          >
            <FormSubmit>
              Войти в аккаунт
            </FormSubmit>

            <FormDivider />

            <FormSocials />
          </Stack>
        </Stack>
      </Form>
    </FormLayout>
  )
}
