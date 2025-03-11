<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SpaceUser extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;

    public $keyType = 'string';

    protected $fillable = [
        'space_id',
        'email',
        'role_id'
    ];

    public function projects()
    {
        return $this->belongsToMany(Project::class, 'project_space_users',
             'space_user_id', 'project_id');
    }
}
