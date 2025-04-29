<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FinanceProject extends Model
{
    protected $fillable = [
        'price', 'comment',
        'status_id', 'project_id',
        'coordinator_id', 'lead_id',
        'customer_id', 'source_id',
        'space_id'
    ];

    public function status(): BelongsTo
    {
        return $this->belongsTo(FinanceProjectStatus::class);
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function coordinator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'coordinator_id');
    }

    public function lead(): BelongsTo
    {
        return $this->belongsTo(User::class, 'lead_id');
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function source(): BelongsTo
    {
        return $this->belongsTo(User::class, 'source_id');
    }

    public function space(): BelongsTo
    {
        return $this->belongsTo(Space::class);
    }

    public function scopeCurrentSpace($query)
    {
        return $query->where('space_id', auth()->user()->getSpaceId());
    }

    public function scopeWithSearch($query, $term)
    {
        return $query->where('price', 'like', '%' . $term . '%')
            ->orWhere('comment', 'like', '%' . $term . '%')
            ->orWhere('id', 'like', '%' . $term . '%')
            ->orWhereHas('status', function ($query) use ($term) {
                $query->where('name', 'like', '%' . $term . '%');
            })
            ->orWhereHas('coordinator', function ($query) use ($term) {
                $query->where('name', 'like', '%' . $term . '%');
            })
            ->orWhereHas('project', function ($query) use ($term) {
                $query->where('name', 'like', '%' . $term . '%');
            })
            ->orWhereHas('lead', function ($query) use ($term) {
                $query->where('name', 'like', '%' . $term . '%');
            })
            ->orWhereHas('customer', function ($query) use ($term) {
                $query->where('name', 'like', '%' . $term . '%');
            })
            ->orWhereHas('source', function ($query) use ($term) {
                $query->where('name', 'like', '%' . $term . '%');
            });
    }

    public static function statusOrder(Collection $collection, array $statusesOrder)
    {
        return $collection->sortBy(function ($item) use ($statusesOrder) {
            $status = FinanceProjectStatus::find($item->status_id)->name;
            $key = array_search($status, $statusesOrder);
            return $key !== false ? $key : count($statusesOrder);
        });
    }
}
