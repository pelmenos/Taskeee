import { Form } from "shared/ui/Form/Form"
import { useUnit } from "effector-react/compat"
import { FormText } from "shared/ui/Form/FormText"
import { emailConfirmModel } from "features/password-recovery-flow"
import { Button, Group, PinInput, Stack, Title } from "@mantine/core"
import { FormSubmit } from "shared/ui/Form/FormSubmit"
import React, { useEffect } from "react"
import { useForm } from "@mantine/form"
import { useGate } from "effector-react"


export const StageEmailConfirm = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      code: "",
    },
  })

  const {
    submitted,
    codeResent,
    buttonUnlockedAfterTime,
    buttonResentIsDisabled,
    formErrors,
  } = useUnit({
    submitted: emailConfirmModel.submitted,
    codeResent: emailConfirmModel.codeResent,
    buttonUnlockedAfterTime: emailConfirmModel.$buttonUnlockedAfterTime,
    buttonResentIsDisabled: emailConfirmModel.$buttonResentIsDisabled,
    formErrors: emailConfirmModel.$formErrors,
  })

  useGate(emailConfirmModel.Gate)

  useEffect(() => {
    form.setErrors(formErrors)
  }, [formErrors])

  const handleSubmit = ({ code }: typeof form.values) => {
    submitted({
      code: Number(code),
    })
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
          Код для подтверждения пароля отправлен на ваш E-mail.
        </FormText>

        <Group justify="space-between">
          <FormText>
            Не пришел код?
          </FormText>

          <Button
            variant="transparent"
            bg="transparent"
            p={0}
            c="onSurfaceHighest"
            onClick={codeResent}
            disabled={buttonResentIsDisabled}
          >
            Отправить еще раз{" "}
            {buttonResentIsDisabled && <span>({buttonUnlockedAfterTime} с.)</span>}
          </Button>
        </Group>

        <PinInput
          length={6}
          type="number"
          placeholder=""
          size="lg"
          key={form.key("code")}
          {...form.getInputProps("code")}
        />

        <FormSubmit>
          Следующий шаг
        </FormSubmit>
      </Stack>
    </Form>
  )
}
