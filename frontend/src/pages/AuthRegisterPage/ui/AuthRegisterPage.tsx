import React from "react"
import { FormLayout } from "widgets/layouts/form-layout"
import { useUnit } from "effector-react"
import { StageRegister } from "./StageRegister"
import { StageConfirm } from "./StageConfirm"
import { RegisterFlowStages, stagesModel } from "features/register-flow/model/stages"


export const AuthRegisterPage = () => {
  const stage = useUnit(stagesModel.$currentStage)

  return (
    <FormLayout>
      {stage === RegisterFlowStages.Register && <StageRegister />}
      {stage === RegisterFlowStages.Confirm && <StageConfirm />}
    </FormLayout>
  )
}

