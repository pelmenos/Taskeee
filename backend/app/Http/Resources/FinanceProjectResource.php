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
            'price' => $this->price,
            'comment' => $this->comment,
            'status' => FinanceProjectStatus::find($this->status_id),
            'project' => Project::find($this->project_id),
            'coordinator' => User::find($this->coordinator_id),
            'lead' => User::find($this->lead_id),
            'customer' => User::find($this->customer_id),
            'source' => User::find($this->source_id),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
