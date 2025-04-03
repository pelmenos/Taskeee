import { Form } from "shared/ui/Form/Form"
import { Mail } from "shared/ui/assets/icons/Mail"
import { useUnit } from "effector-react/compat"
import React, { useEffect } from "react"
import { FormText } from "shared/ui/Form/FormText"
import { emailModel } from "features/password-recovery-flow"
import { FormSubmit } from "shared/ui/Form/FormSubmit"
import { Stack, Title } from "@mantine/core"
import { FormInput } from "shared/ui/Form/FormInput"
import { useForm } from "@mantine/form"


export const StageEmail = () => {
  const { setErrors, ...form } = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
    },
  })

  const {
    submitted,
    formErrors,
  } = useUnit({
    submitted: emailModel.submitted,
    formErrors: emailModel.$formErrors,
  })

  useEffect(() => {
    setErrors(formErrors)
  }, [setErrors, formErrors])

  const handleSubmit = (fields: typeof form.values) => {
    submitted(fields)
  }

  return (
    <Form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="xxl">
        <Title
          order={1}
          size="h1"
        >
          Восстановление пароля
        </Title>

        <FormText>
          Код для подтверждения пароля будет отправлен на ваш E-mail.
        </FormText>

        <FormInput
          icon={Mail}
          placeholder="Электронная почта"
          key={form.key("email")}
          {...form.getInputProps("email")}
        />

        <FormSubmit>
          Следующий шаг
        </FormSubmit>
      </Stack>
    </Form>
  )
}
