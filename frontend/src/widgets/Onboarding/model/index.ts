import { update } from "@farfetched/core"
import { spaceModel } from "features/current-space/model/space"
import { createSpaceModel } from "../../CreateSpaceModal/model"


update(spaceModel.spaceListQuery,
  {
    on: createSpaceModel.createSpaceMutation,
    by: {
      success: ({ query }) => {
        let result = null

        if ("result" in query) {
          result = query.result
        }

        return ({
          result: result,
          refetch: true,
        })
      },
    },
  },
)
