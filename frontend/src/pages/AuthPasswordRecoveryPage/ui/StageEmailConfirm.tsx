import { Form } from "shared/ui/Form"
import { useUnit } from "effector-react/compat"
import { PinInput } from "shared/ui/PinInput"
import { Button } from "shared/ui/Button"
import { FormTitle } from "shared/ui/Form/FormTitle"
import { FormText } from "shared/ui/Form/FormText"
import { FormFallbackContainer } from "shared/ui/Form/FormFallbackContainer"
import { FormFallbackButton } from "shared/ui/Form/FormFallbackButton"
import { FormFieldContainer } from "shared/ui/Form/FormFieldContainer"
import { FormFooterContainer } from "shared/ui/Form/FormFooterContainer"
import { emailConfirmModel } from "features/password-recovery-flow"


export const StageEmailConfirm = () => {
  const {
    submitted,
    codeChanged,
    codeResent,
    buttonUnlockedAfterTime,
    buttonResentIsDisabled,
    formErrors,
  } = useUnit({
    submitted: emailConfirmModel.submitted,
    codeChanged: emailConfirmModel.codeChanged,
    codeResent: emailConfirmModel.codeResent,
    buttonUnlockedAfterTime: emailConfirmModel.$buttonUnlockedAfterTime,
    buttonResentIsDisabled: emailConfirmModel.$buttonResentIsDisabled,
    formErrors: emailConfirmModel.$formErrors,
  })

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault()
        submitted()
      }}
    >
      <FormTitle>Восстановление пароля</FormTitle>

      <FormText>Код для подтверждения пароля отправлен на ваш E-mail.</FormText>

      <FormFallbackContainer>
        <FormText>Не пришел код?</FormText>

        <FormFallbackButton onClick={codeResent} disabled={buttonResentIsDisabled}>
          Отправить еще раз {buttonResentIsDisabled && <span>({buttonUnlockedAfterTime} с.)</span>}
        </FormFallbackButton>
      </FormFallbackContainer>

      <FormFieldContainer>
        {formErrors.root && <span>{formErrors.root}</span>}

        <PinInput length={6} onChange={codeChanged} />

        {formErrors.code && <span>{formErrors.code}</span>}
      </FormFieldContainer>

      <FormFooterContainer>
        <Button type="submit">Следующий шаг</Button>
      </FormFooterContainer>
    </Form>
  )
}
