<?php

declare(strict_types=1);

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\V1\Space\SpaceCreateRequest;
use App\Http\Requests\API\V1\Space\SpaceListRequest;
use App\Http\Requests\API\V1\Space\SpaceUpdateRequest;
use App\Http\Resources\API\V1\Space\SpaceFullResource;
use App\Http\Responses\ErrorResponse;
use App\Http\Responses\SuccessEmptyResponse;
use App\Http\Responses\SuccessResponse;
use App\Services\API\V1\SpaceService;
use Knuckles\Scribe\Attributes\Endpoint;
use Knuckles\Scribe\Attributes\Group;
use Knuckles\Scribe\Attributes\ResponseFromFile;
use Knuckles\Scribe\Attributes\Subgroup;
use Knuckles\Scribe\Attributes\UrlParam;
use Symfony\Component\HttpFoundation\Response;

#[Group('API V1', '', true)]
#[Subgroup('Пространства')]
final class SpaceController extends Controller
{
    public function __construct(
        private readonly SpaceService $service,
    )
    {
    }

    /**
     * @param SpaceListRequest $request
     * @return SuccessResponse|ErrorResponse
     */
    #[Endpoint('Список', '', true)]
    #[ResponseFromFile(file: 'responses/api/v1/space/list.json', status: Response::HTTP_OK, description: 'success')]
    #[ResponseFromFile(file: 'responses/api/v1/general/forbidden.json', status: Response::HTTP_FORBIDDEN, description: 'forbidden')]
    #[ResponseFromFile(file: 'responses/api/v1/general/validation-failed.json', status: Response::HTTP_UNPROCESSABLE_ENTITY, description: 'validation failed')]
    #[ResponseFromFile(file: 'responses/api/v1/general/unauthenticated.json', status: Response::HTTP_UNAUTHORIZED, description: 'unauthenticated')]
    public function list(SpaceListRequest $request): SuccessResponse|ErrorResponse
    {
        $result = $this->service->list(auth()->user(), $request->toDto());

        if ($result === Response::HTTP_FORBIDDEN) {
            return new ErrorResponse(__('api/v1/errors.forbidden'), Response::HTTP_FORBIDDEN);
        } else {
            return new SuccessResponse(SpaceFullResource::collection($result), __('api/v1/space.list'));
        }
    }

    /**
     * @param SpaceCreateRequest $request
     * @return SuccessResponse|ErrorResponse
     */
    #[Endpoint('Создание', '', true)]
    #[ResponseFromFile(file: 'responses/api/v1/space/create.json', status: Response::HTTP_CREATED, description: 'success')]
    #[ResponseFromFile(file: 'responses/api/v1/general/forbidden.json', status: Response::HTTP_FORBIDDEN, description: 'forbidden')]
    #[ResponseFromFile(file: 'responses/api/v1/general/validation-failed.json', status: Response::HTTP_UNPROCESSABLE_ENTITY, description: 'validation failed')]
    #[ResponseFromFile(file: 'responses/api/v1/general/unauthenticated.json', status: Response::HTTP_UNAUTHORIZED, description: 'unauthenticated')]
    #[ResponseFromFile(file: 'responses/api/v1/general/went-wrong.json', status: Response::HTTP_INTERNAL_SERVER_ERROR, description: 'went wrong')]
    public function create(SpaceCreateRequest $request): SuccessResponse|ErrorResponse
    {
        $result = $this->service->create(auth()->user(), $request->toDto());

        if ($result === Response::HTTP_FORBIDDEN) {
            return new ErrorResponse(__('api/v1/errors.forbidden'), Response::HTTP_FORBIDDEN);
        } else if ($result === Response::HTTP_INTERNAL_SERVER_ERROR) {
            return new ErrorResponse(__('api/v1/errors.went-wrong'), Response::HTTP_INTERNAL_SERVER_ERROR);
        } else {
            return new SuccessResponse(
                new SpaceFullResource($result),
                __('api/v1/space.create'),
                Response::HTTP_CREATED
            );
        }
    }

    /**
     * @param string $modelId
     * @return SuccessResponse|ErrorResponse
     */
    #[Endpoint('Детали', '', true)]
    #[UrlParam('modelId', 'uuid', 'ID-пространства', true, 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')]
    #[ResponseFromFile(file: 'responses/api/v1/space/item.json', status: Response::HTTP_OK, description: 'success')]
    #[ResponseFromFile(file: 'responses/api/v1/space/not-found.json', status: Response::HTTP_NOT_FOUND, description: 'not found')]
    #[ResponseFromFile(file: 'responses/api/v1/general/forbidden.json', status: Response::HTTP_FORBIDDEN, description: 'forbidden')]
    #[ResponseFromFile(file: 'responses/api/v1/general/unauthenticated.json', status: Response::HTTP_UNAUTHORIZED, description: 'unauthenticated')]
    public function item(string $modelId): SuccessResponse|ErrorResponse
    {
        $result = $this->service->item(auth()->user(), $modelId);

        if ($result === Response::HTTP_FORBIDDEN) {
            return new ErrorResponse(__('api/v1/errors.forbidden'), Response::HTTP_FORBIDDEN);
        } else if ($result === Response::HTTP_NOT_FOUND) {
            return new ErrorResponse(__('api/v1/space.not-found'), Response::HTTP_NOT_FOUND);
        } else {
            return new SuccessResponse(new SpaceFullResource($result), __('api/v1/space.item'));
        }
    }

    /**
     * @param string $modelId
     * @param SpaceUpdateRequest $request
     * @return SuccessResponse|ErrorResponse
     */
    #[Endpoint('Обновление', '', true)]
    #[UrlParam('modelId', 'uuid', 'ID-пространства', true, 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')]
    #[ResponseFromFile(file: 'responses/api/v1/space/update.json', status: Response::HTTP_OK, description: 'success')]
    #[ResponseFromFile(file: 'responses/api/v1/space/not-found.json', status: Response::HTTP_NOT_FOUND, description: 'not found')]
    #[ResponseFromFile(file: 'responses/api/v1/general/forbidden.json', status: Response::HTTP_FORBIDDEN, description: 'forbidden')]
    #[ResponseFromFile(file: 'responses/api/v1/general/validation-failed.json', status: Response::HTTP_UNPROCESSABLE_ENTITY, description: 'validation failed')]
    #[ResponseFromFile(file: 'responses/api/v1/general/unauthenticated.json', status: Response::HTTP_UNAUTHORIZED, description: 'unauthenticated')]
    #[ResponseFromFile(file: 'responses/api/v1/general/bad-request.json', status: Response::HTTP_BAD_REQUEST, description: 'bad request')]
    #[ResponseFromFile(file: 'responses/api/v1/general/went-wrong.json', status: Response::HTTP_INTERNAL_SERVER_ERROR, description: 'went wrong')]
    public function update(string $modelId, SpaceUpdateRequest $request): SuccessResponse|ErrorResponse
    {
        $result = $this->service->update(auth()->user(), $modelId, $request->toDto());

        if ($result === Response::HTTP_FORBIDDEN) {
            return new ErrorResponse(__('api/v1/errors.forbidden'), Response::HTTP_FORBIDDEN);
        } else if ($result === Response::HTTP_NOT_FOUND) {
            return new ErrorResponse(__('api/v1/space.not-found'), Response::HTTP_NOT_FOUND);
        } else if ($result === Response::HTTP_BAD_REQUEST) {
            return new ErrorResponse(__('api/v1/errors.bad-request'), Response::HTTP_BAD_REQUEST);
        } else if ($result === Response::HTTP_INTERNAL_SERVER_ERROR) {
            return new ErrorResponse(__('api/v1/errors.went-wrong'), Response::HTTP_INTERNAL_SERVER_ERROR);
        } else {
            return new SuccessResponse(new SpaceFullResource($result), __('api/v1/space.update'));
        }
    }

    /**
     * @param string $modelId
     * @return SuccessEmptyResponse|ErrorResponse
     */
    #[Endpoint('Удаление', '', true)]
    #[UrlParam('modelId', 'uuid', 'ID-пространства', true, 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')]
    #[ResponseFromFile(file: 'responses/api/v1/space/delete.json', status: Response::HTTP_OK, description: 'success')]
    #[ResponseFromFile(file: 'responses/api/v1/space/not-found.json', status: Response::HTTP_NOT_FOUND, description: 'not found')]
    #[ResponseFromFile(file: 'responses/api/v1/general/forbidden.json', status: Response::HTTP_FORBIDDEN, description: 'forbidden')]
    #[ResponseFromFile(file: 'responses/api/v1/general/unauthenticated.json', status: Response::HTTP_UNAUTHORIZED, description: 'unauthenticated')]
    #[ResponseFromFile(file: 'responses/api/v1/general/bad-request.json', status: Response::HTTP_BAD_REQUEST, description: 'bad request')]
    public function delete(string $modelId): SuccessEmptyResponse|ErrorResponse
    {
        $result = $this->service->delete(auth()->user(), $modelId);

        if ($result === Response::HTTP_FORBIDDEN) {
            return new ErrorResponse(__('api/v1/errors.forbidden'), Response::HTTP_FORBIDDEN);
        } else if ($result === Response::HTTP_NOT_FOUND) {
            return new ErrorResponse(__('api/v1/space.not-found'), Response::HTTP_NOT_FOUND);
        } else if ($result === Response::HTTP_BAD_REQUEST) {
            return new ErrorResponse(__('api/v1/errors.bad-request'), Response::HTTP_BAD_REQUEST);
        } else {
            return new SuccessEmptyResponse(__('api/v1/space.delete'));
        }
    }
}
