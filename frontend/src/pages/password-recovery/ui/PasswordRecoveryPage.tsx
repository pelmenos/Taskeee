import React from "react"
import { FormLayout } from "widgets/layouts/form-layout"
import { StepOne } from "./StepOne"
import { useUnit } from "effector-react"
import { passwordRecoveryModel } from "../model"
import { StepTwo } from "./StepTwo"
import { StepThree } from "./StepThree.tsx"

export const PasswordRecoveryPage = () => {
	const stage = useUnit(passwordRecoveryModel.$stage)

	return (
		<FormLayout>
			{stage === "one" && <StepOne />}
			{stage === "two" && <StepTwo />}
			{stage === "three" && <StepThree />}
		</FormLayout>
	)
}
