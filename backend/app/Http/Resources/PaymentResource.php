<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
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
            'sum' => $this->sum,
            'type' => $this->type,
            'status' => $this->status()->first(),
            'finance_project' => FinanceProjectResource::make($this->financeProject()->first()),
            'subject' => $this->subject()->first(),
            'director' => $this->director()->first(),
            'recipient' => $this->recipient()->first(),
            'condition' => $this->condition()->first(),
            'method' => $this->method,
            'updated_at' => $this->updated_at,
            'created_at' => $this->created_at,
        ];
    }
}
