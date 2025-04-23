<?php

declare(strict_types=1);

namespace App\Http\Resources\API\V1\Space;

use App\Http\Resources\API\V1\User\UserShortResource;
use App\Models\Space;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Space
 */
final class SpaceFullResource extends JsonResource
{
    /**
     * @param Request $request
     * @return array
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'admin' => new UserShortResource($this->admin),
            'name' => $this->name,
            'description' => $this->description,
            'tariff' => $this->tariff,
        ];
    }
}
