<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BoardResource extends JsonResource
{

    private $withTasks;

    public function __construct($resource, $withTasks = false)
    {
        parent::__construct($resource);
        $this->withTasks = $withTasks;
    }

    public static function collectionWithTasks($collection, $withTasks = false)
    {
        return $collection->map(function ($resource) use ($withTasks) {
            return new self($resource, $withTasks);
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
        $data['project_id'] = $this->resource->project_id;

        if ($this->withTasks) {
            $data['tasks'] = TaskResource::collection($this->tasks);
        }

        $data['created_at'] = $this->resource->created_at;
        $data['updated_at'] = $this->resource->updated_at;

        return $data;
    }
}
