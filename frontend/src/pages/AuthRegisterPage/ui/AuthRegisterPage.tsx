import React from "react"
import { useUnit } from "effector-react"
import { RegisterFlowStages, stagesModel } from "features/register-flow"
import { FormLayout } from "widgets/FormLayout"
import { StageRegister } from "./StageRegister"
import { StageConfirm } from "./StageConfirm"

export const AuthRegisterPage = () => {
	const stage = useUnit(stagesModel.$currentStage)

	return (
		<FormLayout>
			{stage === RegisterFlowStages.Register && <StageRegister />}
			{stage === RegisterFlowStages.Confirm && <StageConfirm />}
		</FormLayout>
	)
}
