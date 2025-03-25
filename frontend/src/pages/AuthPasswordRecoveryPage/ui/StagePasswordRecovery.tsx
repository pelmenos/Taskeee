import { Form } from "shared/ui/Form/Form"
import { useUnit } from "effector-react/compat"
import React, { useEffect } from "react"
import { passwordRecoveryModel } from "features/password-recovery-flow"
import { Stack, Title } from "@mantine/core"
import { FormText } from "shared/ui/Form/FormText"
import { FormInput } from "shared/ui/Form/FormInput"
import { Mail } from "shared/ui/assets/icons/Mail"
import { FormSubmit } from "shared/ui/Form/FormSubmit"
import { useForm } from "@mantine/form"


export const StagePasswordRecovery = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      password: "",
    },
  })

  const {
    submitted,
    formErrors,
  } = useUnit({
    submitted: passwordRecoveryModel.submitted,
    formErrors: passwordRecoveryModel.$formErrors,
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
          Восстановление пароля
        </Title>

        <FormText>
          Код для подтверждения пароля будет отправлен на ваш E-mail.
        </FormText>

        <FormInput
          icon={Mail}
          placeholder="Новый пароль"
          key={form.key("password")}
          {...form.getInputProps("password")}
        />

        <FormSubmit>
          Подтвердить
        </FormSubmit>
      </Stack>
    </Form>
  )
}
