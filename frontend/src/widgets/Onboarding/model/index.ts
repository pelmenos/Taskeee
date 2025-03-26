import {update} from "@farfetched/core";
import {currentSpaceModel} from "features/current-space/model";
import {createSpaceModel} from "../../CreateSpaceModal/model";

update(currentSpaceModel.spaceListQuery,
  {
    on: createSpaceModel.createSpaceMutation,
    by: {
      success: ({query}) => {
        let result = null

        if ("result" in query) {
          result = query.result
        }

        return ({
          result: result,
          refetch: true
        })
      }
    }
  }
)
