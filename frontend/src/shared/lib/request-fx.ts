// Source: https://github.com/igorkamyshev/farfetched/blob/master/packages/core/src/fetch/request.ts

import {createEffect} from "effector/compat";
import {fetchFx, httpError, HttpError, networkError, NetworkError} from "@farfetched/core";

/**
 * Basic request effect around fetchFx, with some additional features:
 * + it throws error if response status is 4XX/5XX
 * + it throws serializable NetworkError instead of TypeError
 */
export const requestFx = createEffect<
  Request,
  Response,
  NetworkError | HttpError
>({
  handler: async (request) => {
    const response = await fetchFx(request).catch((cause) => {
      throw networkError({
        reason: cause?.message ?? null,
        cause,
      });
    });

    if (!response.ok) {
      throw httpError({
        status: response.status,
        statusText: response.statusText,
        response: (await response.text().catch(() => null)) ?? null,
      });
    }

    return response;
  },
  sid: 'ff.requestFx',
});