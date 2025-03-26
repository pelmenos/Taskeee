import "./Onboarding.scss"
import { ComponentProps } from "react"
import { OnboardingFlowStages, stagesModel } from "features/onboarding-flow/model/stages"
import { useUnit } from "effector-react"
import { StageCreateSpace } from "./StageCreateSpace"
import { StageCreateProject } from "./StageCreateProject"
import { Box } from "@mantine/core"


interface Props extends ComponentProps<typeof Box> {

}

export const Onboarding = (props: Props) => {
  const stage = useUnit(stagesModel.$stage)

  return (
    <Box
      p="xxl"
      {...props}
    >
      {stage === OnboardingFlowStages.CreateSpaceStage && <StageCreateSpace/>}
      {stage === OnboardingFlowStages.CreateProjectStage && <StageCreateProject/>}
    </Box>
  )
}
