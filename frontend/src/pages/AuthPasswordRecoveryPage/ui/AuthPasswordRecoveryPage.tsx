import { FormLayout } from "widgets/layouts/form-layout"
import { StageEmail } from "./StageEmail"
import { StageEmailConfirm } from "./StageEmailConfirm"
import { StagePasswordRecovery } from "./StagePasswordRecovery"
import { PasswordRecoveryFlowStages, stagesModel } from "features/password-recovery-flow"
import { useUnit } from "effector-react"

export const AuthPasswordRecoveryPage = () => {
  const stage = useUnit(stagesModel.$stage)

  return (
    <FormLayout>
      {stage === PasswordRecoveryFlowStages.EmailStage && <StageEmail />}
      {stage === PasswordRecoveryFlowStages.EmailConfirmStage && <StageEmailConfirm />}
      {stage === PasswordRecoveryFlowStages.PasswordRecoveryStage && <StagePasswordRecovery />}
    </FormLayout>
  )
}
