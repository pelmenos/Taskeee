<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SpaceUserResource extends JsonResource
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
        $data['space_id'] = $this->resource->space_id;
        $data['email'] = $this->resource->email;
        $data['role_id'] = $this->resource->role_id;
        $data['created_at'] = $this->resource->created_at;
        $data['updated_at'] = $this->resource->updated_at;

        return $data;
    }
}
