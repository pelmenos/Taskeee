<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{

    public function __construct($resource)
    {
        parent::__construct($resource);
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
        $data['status'] = $this->resource->status;
        $data['board_id'] = $this->resource->board_id;
        $data['created_at'] = $this->resource->created_at;
        $data['updated_at'] = $this->resource->updated_at;

        return $data;
    }
}
