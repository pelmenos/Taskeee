<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'sum', 'status_id', 'finance_project_id',
        'subject_id', 'type', 'director_id',
        'recipient_id', 'condition_id', 'method'
    ];

    public function status()
    {
        return $this->belongsTo(PaymentStatus::class, 'status_id');
    }

    public function financeProject()
    {
        return $this->belongsTo(FinanceProject::class);
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
}
