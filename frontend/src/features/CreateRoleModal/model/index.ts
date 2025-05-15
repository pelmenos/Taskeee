import {update} from "@farfetched/core";
import {combine, createEvent, createStore, restore, sample, split} from "effector";
import {createGate} from "effector-react";
import {createCreateRoleMutation, CreateRoleSchema, RoleListItem} from "entities/role";
import {reset, spread} from "patronum";
import {mapErrors} from "shared/lib/map-form-errors";
import {spaceModel} from "../../current-space";

export const Gate = createGate<() => void>()

const $successCallback = restore(Gate.open, null)

const createRoleMutation = createCreateRoleMutation()

export const submitPressed = createEvent<Omit<CreateRoleSchema, "space_id">>()

const {failure, success} = split(
  sample({
    clock: createRoleMutation.finished.success,
    fn: ({result}) => result,
  }),
  {
    failure: (result) => "errors" in result,
    success: (result) => "id" in result,
  },
)

const $errorFieldName = createStore<string | null>(null)
const $errorFieldDescription = createStore<string | null>(null)

export const $formErrors = combine({
  name: $errorFieldName,
  description: $errorFieldDescription,
})

reset({
  clock: createRoleMutation.started,
  target: [$errorFieldDescription, $errorFieldName],
})

sample({
  clock: submitPressed,
  source: {
    currentSpace: spaceModel.$currentSpace,
    pending: createRoleMutation.$pending,
  },
  filter: ({currentSpace, pending}) => Boolean(currentSpace && !pending),
  fn: ({currentSpace}, form) => ({
    ...form,
    space_id: currentSpace!.id,
  }),
  target: createRoleMutation.start,
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
    name: $errorFieldName,
    description: $errorFieldDescription,
  }),
})

update(spaceModel.roleListQuery, {
  on: createRoleMutation,
  by: {
    success: ({query}) => {
      let result: Array<RoleListItem> = []

      if ("result" in query) {
        result = query.result
      }

      return {
        result: result,
        refetch: true,
      }
    },
  }
})
