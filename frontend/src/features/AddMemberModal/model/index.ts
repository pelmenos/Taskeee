import {combine, createEvent, createStore, restore, sample, split} from "effector";
import {createGate} from "effector-react";
import {createAddMemberMutation} from "entities/space";
import {reset, spread} from "patronum";
import {mapErrors} from "shared/lib/map-form-errors";
import {spaceModel} from "../../current-space";

export const Gate = createGate<() => void>()

const $successCallback = restore(Gate.open, null)

const addMemberMutation = createAddMemberMutation()

export const submitPressed = createEvent<{
  role_id: string
  email: string
}>()

const {failure, success} = split(
  sample({
    clock: addMemberMutation.finished.success,
    fn: ({result}) => result,
  }),
  {
    failure: (result) => "errors" in result,
    success: (result) => "message" in result,
  },
)

const $errorFieldRole = createStore<string | null>(null)
const $errorFieldEmail = createStore<string | null>(null)

export const $formErrors = combine({
  email: $errorFieldEmail,
  role_id: $errorFieldRole,
})

reset({
  clock: addMemberMutation.started,
  target: [$errorFieldEmail, $errorFieldRole],
})

sample({
  clock: submitPressed,
  source: {
    currentSpace: spaceModel.$currentSpace,
    pending: addMemberMutation.$pending,
  },
  filter: ({currentSpace, pending}) => Boolean(currentSpace && !pending),
  fn: ({currentSpace}, form) => ({
    ...form,
    space_id: currentSpace!.id,
  }),
  target: addMemberMutation.start,
})

sample({
  clock: success,
  source: $successCallback,
  fn: (source) => source?.call(null),
})

sample({
  clock: failure,
  fn: ({errors}) => mapErrors(errors),
  target: spread({
    role_id: $errorFieldRole,
    email: $errorFieldEmail,
  }),
})
