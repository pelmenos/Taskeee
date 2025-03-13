<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;

    public $keyType = 'string';

    protected $fillable = [
        'name',
        'description',
        'space_id',
        'boards'
    ];

    protected $hidden = ['spaceUsers'];

    protected $casts = [
        'boards' => 'array'
    ];

    public function space()
    {
        return $this->belongsTo(Space::class, 'space_id', 'id');
    }

    public function spaceUsers()
    {
        return $this->belongsToMany(SpaceUser::class, 'project_space_users',
            'project_id', 'space_user_id');
    }
}
