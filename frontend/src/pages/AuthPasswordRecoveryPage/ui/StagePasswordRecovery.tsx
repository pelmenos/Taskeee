import { Form } from "shared/ui/Form"
import { useForm } from "react-hook-form"
import { useUnit } from "effector-react/compat"
import { Password } from "shared/ui/assets/icons/Password"
import { Button } from "shared/ui/Button"
import { FormFooterContainer } from "shared/ui/Form/FormFooterContainer"
import { FormTitle } from "shared/ui/Form/FormTitle"
import { FormFieldContainer } from "shared/ui/Form/FormFieldContainer"
import React, { useEffect } from "react"
import { FormField } from "shared/ui/Form/FormField"
import { passwordRecoveryModel, StagePasswordRecoveryFields } from "features/password-recovery-flow"


export const StagePasswordRecovery = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<StagePasswordRecoveryFields>()

  const {
    submitted,
    formErrors,
  } = useUnit({
    submitted: passwordRecoveryModel.submitted,
    formErrors: passwordRecoveryModel.$formErrors,
  })

  useEffect(() => {
    Object.entries(formErrors).forEach(([field, error]) =>
      error && setError(field as keyof StagePasswordRecoveryFields, { message: error }),
    )
  }, [setError, formErrors])

  return (
    <Form onSubmit={handleSubmit(submitted)}>
      <FormTitle>Восстановление пароля</FormTitle>

      <FormFieldContainer>
        {errors.root && (<span>{errors.root.message}</span>)}

        <FormField placeholder="Новый пароль" icon={Password} inputProps={{
          type: "password",
          ...register("password"),
        }} />

        {errors.password && (<span>{errors.password.message}</span>)}
      </FormFieldContainer>

      <FormFooterContainer>
        <Button type="submit">Подтвердить</Button>
      </FormFooterContainer>
    </Form>
  )
}
