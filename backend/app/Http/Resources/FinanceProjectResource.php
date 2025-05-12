<?php

namespace App\Http\Resources;

use App\Models\FinanceProjectStatus;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FinanceProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'price' => (float)$this->price,
            'comment' => $this->comment,
            'status' => $this->status()->first(),
            'project' => $this->project()->first(),
            'coordinator' => $this->coordinator()->first(),
            'lead' => $this->lead()->first(),
            'customer' => $this->customer()->first(),
            'source' => $this->source()->first(),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
