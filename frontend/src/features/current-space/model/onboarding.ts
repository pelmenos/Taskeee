import { atom } from "shared/lib/factory"
import { createStore, sample } from "effector"
import { spaceModel } from "./space"

export enum OnboardingFlowStages {
  CreateSpaceStage = "create-space",
  CreateProjectStage = "create-project",
}

export const onboardingModel = atom(() => {
  const $stage = createStore(OnboardingFlowStages.CreateSpaceStage)

  sample({
    source: spaceModel.$currentSpace,
    filter: Boolean,
    fn: () => OnboardingFlowStages.CreateProjectStage,
    target: $stage,
  })

  return {
    $stage,
  }
})
