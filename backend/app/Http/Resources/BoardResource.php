<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BoardResource extends JsonResource
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
        $data['project_id'] = $this->resource->project_id;

        return $data;
    }
}
