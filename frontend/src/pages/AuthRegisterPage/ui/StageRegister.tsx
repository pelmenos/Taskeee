import { useUnit } from "effector-react"
import React, { useEffect } from "react"
import { Form } from "shared/ui/Form/Form"
import { FormText } from "shared/ui/Form/FormText"
import { routes } from "shared/routing"
import { Mail } from "shared/ui/assets/icons/Mail"
import { Password } from "shared/ui/assets/icons/Password"
import { FormSocials } from "shared/ui/Form/FormSocials"
import { registerModel } from "features/register-flow"
import { Group, Stack, Text, Title } from "@mantine/core"
import { Link } from "atomic-router-react"
import { FormInput } from "shared/ui/Form/FormInput"
import { FormSubmit } from "shared/ui/Form/FormSubmit"
import { FormDivider } from "shared/ui/Form/FormDivider"
import { useForm } from "@mantine/form"
import { ProfileIcon } from "shared/ui/assets/icons/ProfileIcon"

export const StageRegister = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const {
    submitted,
    formErrors,
  } = useUnit({
    submitted: registerModel.submitted,
    formErrors: registerModel.$formErrors,
  })

  useEffect(() => {
    form.setErrors(formErrors)
  }, [formErrors])

  const handleSubmit = (fields: typeof form.values) => {
    submitted(fields)
  }

  return (
    <Form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="xxl">
        <Title
          order={1}
          ff="Montserrat, serif"
          fz={{
            base: "2rem",
            "512px": "1.5rem",
          }}
        >
          Регистрация
        </Title>

        <Group justify="space-between">
          <FormText>
            Уже есть аккаунт?
          </FormText>

          <Link
            style={{ textDecoration: "none" }}
            to={routes.auth.login}>
            <Text
              fz="0.825rem"
              fw={500}
              c="onSurface"
              span
            >
              Войти в аккаунт
            </Text>
          </Link>
        </Group>

        <Stack gap="xl">

          <FormInput
            icon={ProfileIcon}
            type="text"
            placeholder="Имя и фимилия"
            key={form.key("name")}
            {...form.getInputProps("name")}
          />

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
        </Stack>

        <Stack gap="xl">
          <FormSubmit>
            Создать аккаунт
          </FormSubmit>

          <FormDivider />

          <FormSocials />
        </Stack>
      </Stack>
    </Form>
  )
}
