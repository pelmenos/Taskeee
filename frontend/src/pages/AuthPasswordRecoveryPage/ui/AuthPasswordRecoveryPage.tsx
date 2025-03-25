import { FormLayout } from "widgets/layouts/form-layout"
import { StageEmail } from "./StageEmail"
import { PasswordRecoveryFlowStages, stagesModel } from "features/password-recovery-flow"
import { useUnit } from "effector-react"
import { StageEmailConfirm } from "./StageEmailConfirm"
import { StagePasswordRecovery } from "./StagePasswordRecovery"

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
