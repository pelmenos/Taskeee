import "./Onboarding.scss"
import { useUnit } from "effector-react"
import { BoxProps , Box } from "@mantine/core"

import { OnboardingFlowStages, onboardingModel } from "features/current-space"
import { StageCreateSpace } from "./StageCreateSpace"
import { StageCreateProject } from "./StageCreateProject"


interface Props extends BoxProps {

}

export const Onboarding = (props: Props) => {
  const stage = useUnit(onboardingModel.$stage)

  return (
    <Box
      p="xxl"
      {...props}
    >
      {stage === OnboardingFlowStages.CreateSpaceStage && <StageCreateSpace />}
      {stage === OnboardingFlowStages.CreateProjectStage && <StageCreateProject />}
    </Box>
  )
}
