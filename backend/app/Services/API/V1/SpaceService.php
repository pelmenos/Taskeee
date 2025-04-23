<?php

declare(strict_types=1);

namespace App\Services\API\V1;

use App\DTOs\API\V1\Space\SpaceCreateDto;
use App\DTOs\API\V1\Space\SpaceListDto;
use App\DTOs\API\V1\Space\SpaceUpdateDto;
use App\Models\Space;
use App\Models\User;
use App\Repositories\API\V1\SpaceRepository;
use Exception;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

final class SpaceService
{
    public function __construct(
        private readonly SpaceRepository $repository,
    )
    {
    }

    /**
     * @param User $currentUser
     * @param SpaceListDto $dto
     * @return LengthAwarePaginator|int
     */
    public function list(User $currentUser, SpaceListDto $dto): LengthAwarePaginator|int
    {
        if (Gate::forUser($currentUser)->denies('list', Space::class)) {
            return Response::HTTP_FORBIDDEN;
        }

        return $this->repository->list($dto);
    }

    /**
     * @param User $currentUser
     * @param SpaceCreateDto $dto
     * @return Space|int
     */
    public function create(User $currentUser, SpaceCreateDto $dto): Space|int
    {
        try {
            if (Gate::forUser($currentUser)->denies('create', Space::class)) {
                return Response::HTTP_FORBIDDEN;
            }

            return $this->repository->create($dto);
        } catch (Exception $e) {
            Log::channel('space-service')
                ->error($e->getMessage() . PHP_EOL . $e->getTraceAsString());

            return Response::HTTP_INTERNAL_SERVER_ERROR;
        }
    }

    /**
     * @param User $currentUser
     * @param string $modelId
     * @return Space|int
     */
    public function item(User $currentUser, string $modelId): Space|int
    {
        $model = $this->repository->item($modelId);

        if (!($model instanceof Space)) {
            return Response::HTTP_NOT_FOUND;
        }

        if (Gate::forUser($currentUser)->denies('item', $model)) {
            return Response::HTTP_FORBIDDEN;
        }

        return $model;
    }

    /**
     * @param User $currentUser
     * @param Space|string $model
     * @param SpaceUpdateDto $dto
     * @return Space|int
     */
    public function update(User $currentUser, Space|string $model, SpaceUpdateDto $dto): Space|int
    {
        try {
            if (is_string($model)) {
                $model = $this->repository->item($model);

                if (!($model instanceof Space)) {
                    return Response::HTTP_NOT_FOUND;
                }
            }

            if (Gate::forUser($currentUser)->denies('update', $model)) {
                return Response::HTTP_FORBIDDEN;
            }

            return $this->repository->update($model, $dto);
        } catch (Exception $e) {
            Log::channel('space-service')
                ->error($e->getMessage() . PHP_EOL . $e->getTraceAsString());

            return Response::HTTP_INTERNAL_SERVER_ERROR;
        }
    }

    /**
     * @param User $currentUser
     * @param Space|string $model
     * @return true|int
     */
    public function delete(User $currentUser, Space|string $model): true|int
    {
        if (is_string($model)) {
            $model = $this->repository->item($model);

            if (!($model instanceof  Space)) {
                return Response::HTTP_NOT_FOUND;
            }
        }

        if (Gate::forUser($currentUser)->denies('delete', $model)) {
            return Response::HTTP_FORBIDDEN;
        }

        return $this->repository->delete($model);
    }
}
