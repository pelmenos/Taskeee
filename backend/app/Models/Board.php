<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Board extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;

    public $keyType = 'string';

    protected $fillable = [
        'name',
        'description',
        'project_id'
    ];

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id', 'id');
    }
}
