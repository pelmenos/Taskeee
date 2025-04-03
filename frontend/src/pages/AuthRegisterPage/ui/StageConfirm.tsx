import { useGate, useUnit } from "effector-react"
import { Form } from "shared/ui/Form/Form"
import { FormText } from "shared/ui/Form/FormText"
import React, { useEffect } from "react"
import { confirmModel } from "features/register-flow"
import { Button, Group, PinInput, Stack, Title } from "@mantine/core"
import { FormSubmit } from "shared/ui/Form/FormSubmit"
import { useForm } from "@mantine/form"


export const StageConfirm = () => {
  const { setErrors, ...form } = useForm({
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
    submitted: confirmModel.submitted,
    codeResent: confirmModel.codeResent,
    buttonUnlockedAfterTime: confirmModel.$buttonUnlockedAfterTime,
    buttonResentIsDisabled: confirmModel.$buttonResentIsDisabled,
    formErrors: confirmModel.$formErrors,
  })

  useGate(confirmModel.Gate)

  useEffect(() => {
    setErrors(formErrors)
  }, [setErrors, formErrors])

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
          size="h1"
        >
          Подтверждение аккаунта
        </Title>

        <FormText>Код для подтверждения пароля отправлен на ваш E-mail.</FormText>

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
          Подтвердить аккаунт
        </FormSubmit>
      </Stack>
    </Form>
  )
}
