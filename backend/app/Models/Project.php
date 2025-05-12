<?php

namespace App\Models;

use Askedio\SoftCascade\Traits\SoftCascadeTrait;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use HasFactory, HasUuids, SoftDeletes, SoftCascadeTrait;

    public $incrementing = false;

    public $keyType = 'string';

    protected $softCascade = ['projectSpaceUsers', 'boards'];

    protected $fillable = [
        'name',
        'description',
        'space_id'
    ];

    public function space()
    {
        return $this->belongsTo(Space::class, 'space_id', 'id');
    }

    public function boards()
    {
        return $this->hasMany(Board::class, 'project_id', 'id');
    }

    public function spaceUsers()
    {
        return $this->belongsToMany(SpaceUser::class, 'project_space_users',
            'project_id', 'space_user_id');
    }

    public function projectSpaceUsers()
    {
        return $this->hasMany(ProjectSpaceUser::class, 'project_id',
            'id');
    }
}
