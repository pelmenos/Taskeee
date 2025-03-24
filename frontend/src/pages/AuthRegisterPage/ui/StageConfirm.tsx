import { useGate, useUnit } from "effector-react"
import { Form } from "shared/ui/Form"
import { FormTitle } from "shared/ui/Form/FormTitle"
import { FormText } from "shared/ui/Form/FormText"
import { FormFallbackContainer } from "shared/ui/Form/FormFallbackContainer"
import { FormFallbackButton } from "shared/ui/Form/FormFallbackButton"
import { FormFieldContainer } from "shared/ui/Form/FormFieldContainer"
import { PinInput } from "shared/ui/PinInput"
import { FormFooterContainer } from "shared/ui/Form/FormFooterContainer"
import { Button } from "shared/ui/Button"
import React from "react"
import { confirmModel } from "features/register-flow"

export const StageConfirm = () => {
  const {
    submitted,
    codeChanged,
    codeResent,
    buttonUnlockedAfterTime,
    buttonResentIsDisabled,
    formErrors,
  } = useUnit({
    submitted: confirmModel.submitted,
    codeChanged: confirmModel.codeChanged,
    codeResent: confirmModel.codeResent,
    buttonUnlockedAfterTime: confirmModel.$buttonUnlockedAfterTime,
    buttonResentIsDisabled: confirmModel.$buttonResentIsDisabled,
    formErrors: confirmModel.$formErrors,
  })

  useGate(confirmModel.Gate)

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault()
        submitted()
      }}
    >
      <FormTitle>Подтверждение аккаунта</FormTitle>

      <FormText>Код для подтверждения пароля отправлен на ваш E-mail.</FormText>

      <FormFallbackContainer>
        <FormText>Не пришел код?</FormText>

        <FormFallbackButton onClick={codeResent} disabled={buttonResentIsDisabled}>
          Отправить еще раз{" "}
          {buttonResentIsDisabled && <span>({buttonUnlockedAfterTime} с.)</span>}
        </FormFallbackButton>
      </FormFallbackContainer>

      <FormFieldContainer>
        {formErrors.root && <span>{formErrors.root}</span>}

        <PinInput length={6} onChange={(val) => codeChanged(val)} />

        {formErrors.code && <span>{formErrors.code}</span>}
      </FormFieldContainer>

      <FormFooterContainer>
        <Button type="submit">Подтвердить аккаунт</Button>
      </FormFooterContainer>
    </Form>
  )
}
