import { Form } from "shared/ui/Form"
import { Mail } from "shared/ui/assets/icons/Mail"
import { useForm } from "react-hook-form"
import { useUnit } from "effector-react/compat"
import { Button } from "shared/ui/Button"
import { FormTitle } from "shared/ui/Form/FormTitle"
import React, { useEffect } from "react"
import { FormText } from "shared/ui/Form/FormText"
import { FormFieldContainer } from "shared/ui/Form/FormFieldContainer"
import { FormField } from "shared/ui/Form/FormField"
import { FormFooterContainer } from "shared/ui/Form/FormFooterContainer"
import { emailModel, StageEmailFields } from "features/password-recovery-flow"


export const StageEmail = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<StageEmailFields>()

  const {
    submitted,
    formErrors,
  } = useUnit({
    submitted: emailModel.submitted,
    formErrors: emailModel.$formErrors,
  })

  useEffect(() => {
    Object.entries(formErrors).forEach(([field, error]) =>
      error && setError(field as keyof StageEmailFields, { message: error }),
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
