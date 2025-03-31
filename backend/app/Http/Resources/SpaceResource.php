<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SpaceResource extends JsonResource
{
    private $withCreatedAt;
    private $withUpdatedAt;

    private $withMembers;

    public function __construct($resource, $withCreatedAt = false, $withUpdatedAt = false, $withMembers = false)
    {
        parent::__construct($resource);
        $this->withCreatedAt = $withCreatedAt;
        $this->withUpdatedAt = $withUpdatedAt;
        $this->withMembers = $withMembers;
    }

    public static function collectionWithFlags($collection, $withCreatedAt = false, $withUpdatedAt = false, $withMembers = false)
    {
        return $collection->map(function ($resource) use ($withCreatedAt, $withUpdatedAt, $withMembers) {
            return new self($resource, $withCreatedAt, $withUpdatedAt, $withMembers);
        });
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = [];

        $data['id'] = $this->resource->id;
        $data['name'] = $this->resource->name;
        $data['description'] = $this->resource->description;
        $data['avatar'] = $this->resource->avatar;
        $data['admin_id'] = $this->resource->admin_id;
        $data['tariff'] = $this->resource->tariff;

        if ($this->withMembers) {
            $data['members'] = SpaceUserResource::collection($this->spaceUsers);
        }

        if ($this->withCreatedAt) {
            $data['created_at'] = $this->resource->created_at;
        }

        if ($this->withUpdatedAt) {
            $data['updated_at'] = $this->resource->updated_at;
        }

        return $data;
    }
}
