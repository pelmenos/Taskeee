<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'sum', 'status_id', 'finance_project_id',
        'subject_id', 'type', 'director_id',
        'recipient_id', 'condition_id', 'method',
        'space_id'
    ];

    public function status()
    {
        return $this->belongsTo(PaymentStatus::class, 'status_id');
    }

    public function financeProject()
    {
        return $this->belongsTo(FinanceProject::class);
    }

    public function project()
    {
        return $this->financeProject()->project();
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function director()
    {
        return $this->belongsTo(User::class, 'director_id');
    }

    public function recipient()
    {
        return $this->belongsTo(User::class, 'recipient_id');
    }

    public function condition()
    {
        return $this->belongsTo(Condition::class);
    }

    public function scopeCurrentSpace($query)
    {
        return $query->where('space_id', auth()->user()->getSpaceId());
    }

    public function scopeWithSearch($query, $term)
    {
        return $query
            ->where('sum', 'like', '%' . $term . '%')
            ->orWhere('comment', 'like', '%' . $term . '%')
            ->orWhere('id', 'like', '%' . $term . '%')
            ->orWhere('type', 'like', '%' . $term . '%')
            ->orWhere('method', 'like', '%' . $term . '%')
            ->orWhereHas('status', function ($query) use ($term) {
                $query->where('name', 'like', '%' . $term . '%');
            })
            ->orWhereHas('subject', function ($query) use ($term) {
                $query->where('name', 'like', '%' . $term . '%');
            })
            ->orWhereHas('director', function ($query) use ($term) {
                $query->where('name', 'like', '%' . $term . '%');
            })
            ->orWhereHas('recipient', function ($query) use ($term) {
                $query->where('name', 'like', '%' . $term . '%');
            })
            ->orWhereHas('condition', function ($query) use ($term) {
                $query->where('name', 'like', '%' . $term . '%');
            })
            ->orWhereHas('financeProject', function ($query) use ($term) {
                $query->whereHas('project', function ($query) use ($term) {
                    $query->where('name', 'like', '%' . $term . '%');
                });
            });
    }

    public static function statusOrder(Collection $collection, array $statusesOrder)
    {
        return $collection->sortBy(function ($item) use ($statusesOrder) {
            $status = PaymentStatus::find($item->status_id)->name;
            $key = array_search($status, $statusesOrder);
            return $key !== false ? $key : count($statusesOrder);
        });
    }
}
