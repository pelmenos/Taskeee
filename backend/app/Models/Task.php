<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;

    public $keyType = 'string';

    protected $fillable = [
        'name',
        'description',
        'status',
        'board_id'
    ];

    public function board()
    {
        return $this->belongsTo(Board::class, 'board_id', 'id');
    }
}
