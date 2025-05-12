<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    protected $fillable = [
        'name', 'description',
        'space_id'
    ];

    public function scopeCurrentSpace($query)
    {
        return $query->where('space_id', auth()->user()->getSpaceId());
    }
}
