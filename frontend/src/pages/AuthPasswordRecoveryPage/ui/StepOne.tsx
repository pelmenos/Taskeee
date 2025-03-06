import { Form } from "shared/ui/Form"
import { Mail } from "shared/ui/Icons/Mail"
import { useForm } from "react-hook-form"
import { useUnit } from "effector-react/compat"
import { authPasswordRecoveryStageOneModel, StepOneFields } from "../model"
import { Button } from "shared/ui/Button"
import { FormTitle } from "shared/ui/Form/FormTitle"
import React, { useEffect } from "react"
import { FormText } from "shared/ui/Form/FormText"
import { FormFieldContainer } from "shared/ui/Form/FormFieldContainer"
import { FormField } from "shared/ui/Form/FormField"
import { FormFooterContainer } from "shared/ui/Form/FormFooterContainer"


export const StepOne = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<StepOneFields>()

  const {
    submitted,
    formErrors,
  } = useUnit({
    submitted: authPasswordRecoveryStageOneModel.submitted,
    formErrors: authPasswordRecoveryStageOneModel.$formErrors,
  })

  useEffect(() => {
    Object.entries(formErrors).forEach(([field, error]) =>
      error && setError(field as keyof StepOneFields, {message: error})
    )
  }, [setError, formErrors])

  return (
    <Form onSubmit={handleSubmit(submitted)}>
      <FormTitle>Восстановление пароля</FormTitle>

      <FormText>Код для подтверждения пароля будет отправлен на ваш E-mail.</FormText>

      <FormFieldContainer>
        {errors.root && (<span>{errors.root.message}</span>)}

        <FormField placeholder="Электронная почта" icon={Mail} inputProps={register("email")} />

        {errors.email && (<span>{errors.email.message}</span>)}

      </FormFieldContainer>

      <FormFooterContainer>
        <Button type="submit">Следующий шаг</Button>
      </FormFooterContainer>
    </Form>
  )
}
