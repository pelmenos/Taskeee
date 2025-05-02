<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SpaceUserResource extends JsonResource
{
    private $withCreatedAt;
    private $withUpdatedAt;
    private $withRoles;

    public function __construct($resource, $withCreatedAt = false, $withUpdatedAt = false, $withRoles = false)
    {
        parent::__construct($resource);
        $this->withCreatedAt = $withCreatedAt;
        $this->withUpdatedAt = $withUpdatedAt;
        $this->withRoles = $withRoles;
    }

    public static function collectionWithFlags($collection, $withCreatedAt = false, $withUpdatedAt = false, $withRoles = false)
    {
        return $collection->map(function ($resource) use ($withCreatedAt, $withUpdatedAt, $withRoles) {
            return new self($resource, $withCreatedAt, $withUpdatedAt, $withRoles);
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
        $data['space_id'] = $this->resource->space_id;
        $data['email'] = $this->resource->email;
        $data['role_id'] = $this->resource->role_id;

        if ($this->withRoles) {
            $data['role'] = new SpaceRoleResource($this->role);
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
