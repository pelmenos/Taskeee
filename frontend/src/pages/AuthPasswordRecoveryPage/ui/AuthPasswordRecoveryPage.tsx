import { FormLayout } from "widgets/layouts/form-layout"
import { StepOne } from "./StepOne"
import { useUnit } from "effector-react"
import { authPasswordRecoveryModel } from "../model"
import { StepTwo } from "./StepTwo"
import { StepThree } from "./StepThree"

export const AuthPasswordRecoveryPage = () => {
  const {
    stage,
  } = useUnit({
    stage: authPasswordRecoveryModel.$stage,
  })

  return (
    <FormLayout>
      {stage === "one" && <StepOne />}
      {stage === "two" && <StepTwo />}
      {stage === "three" && <StepThree />}
    </FormLayout>
  )
}
