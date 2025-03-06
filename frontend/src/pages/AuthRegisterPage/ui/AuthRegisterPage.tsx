import React from "react"
import { FormLayout } from "widgets/layouts/form-layout"
import { authRegisterModel } from "../model"
import { useUnit } from "effector-react"
import { StageRegister } from "./StageRegister"
import { StageConfirm } from "./StageConfirm"


export const AuthRegisterPage = () => {
  const {
    stage,
  } = useUnit({
    stage: authRegisterModel.$stage,
  })

  return (
    <FormLayout>
      {stage === "register" && <StageRegister />}
      {stage === "confirm" && <StageConfirm />}
    </FormLayout>
  )
}

