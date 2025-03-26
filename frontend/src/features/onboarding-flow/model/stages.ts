import {atom} from "shared/lib/factory"
import {createStore, sample} from "effector"
import {currentSpaceModel} from "../../current-space/model";

export enum OnboardingFlowStages {
  CreateSpaceStage = "create-space",
  CreateProjectStage = "create-project",
}

export const stagesModel = atom(() => {
  const $stage = createStore(OnboardingFlowStages.CreateSpaceStage)

  sample({
    source: currentSpaceModel.$currentSpace,
    filter: Boolean,
    fn: () => OnboardingFlowStages.CreateProjectStage,
    target: $stage,
  })

  return {
    $stage,
  }
})
