<?php

declare(strict_types=1);

namespace App\Repositories\API\V1;

use App\DTOs\API\V1\Space\SpaceCreateDto;
use App\DTOs\API\V1\Space\SpaceListDto;
use App\DTOs\API\V1\Space\SpaceUpdateDto;
use App\Models\Space;
use App\QueryFilters\API\V1\SpaceQueryFilter;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Symfony\Component\HttpFoundation\Response;

final class SpaceRepository
{
    /**
     * @param SpaceListDto $dto
     * @return LengthAwarePaginator
     */
    public function list(SpaceListDto $dto): LengthAwarePaginator
    {
        return Space::query()
            ->filter(new SpaceQueryFilter(), $dto->toArray())
            ->orderBy('created_at', 'DESC')
            ->paginate($dto->limit);
    }

    /**
     * @param SpaceCreateDto $dto
     * @return Space
     */
    public function create(SpaceCreateDto $dto): Space
    {
        return Space::query()->create($dto->toArray());
    }

    /**
     * @param string $modelId
     * @return Space|int
     */
    public function item(string $modelId): Space|int
    {
        return Space::query()->find($modelId) ?? Response::HTTP_NOT_FOUND;
    }

    /**
     * @param Space $model
     * @param SpaceUpdateDto $dto
     * @return Space|int
     */
    public function update(Space $model, SpaceUpdateDto $dto): Space|int
    {
        return $model->update($dto->toArray()) ?
            $model->fresh() :
            Response::HTTP_BAD_REQUEST;
    }

    /**
     * @param Space $model
     * @return true|int
     */
    public function delete(Space $model): true|int
    {
        return $model->delete() ?? Response::HTTP_BAD_REQUEST;
    }
}
