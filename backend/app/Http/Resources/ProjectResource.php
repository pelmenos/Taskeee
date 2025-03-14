<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    private $withCreatedAt;
    private $withUpdatedAt;
    private $withTasks;

    public function __construct($resource, $withCreatedAt = false, $withUpdatedAt = false, $withTasks = false)
    {
        parent::__construct($resource);
        $this->withCreatedAt = $withCreatedAt;
        $this->withUpdatedAt = $withUpdatedAt;
        $this->withTasks = $withTasks;
    }

    public static function collectionWithFlags($collection, $withCreatedAt = false, $withUpdatedAt = false, $withTasks = false)
    {
        return $collection->map(function ($resource) use ($withCreatedAt, $withUpdatedAt, $withTasks) {
            return new self($resource, $withCreatedAt, $withUpdatedAt, $withTasks,);
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
        $data['space_id'] = $this->resource->space_id;
        $data['members'] = SpaceUserResource::collection($this->spaceUsers);
        $data['boards'] = BoardResource::collectionWithTasks($this->boards);

        if ($this->withTasks) {
            $data['tasks'] = $this->resource->boards->flatMap->tasks;
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
