<?php

namespace App\Models;

use Askedio\SoftCascade\Traits\SoftCascadeTrait;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SpaceUser extends Model
{
    use HasFactory, HasUuids, SoftDeletes, SoftCascadeTrait;

    public $incrementing = false;

    public $keyType = 'string';

    protected $softCascade = ['projectSpaceUsers'];

    protected $fillable = [
        'space_id',
        'email',
        'role_id'
    ];

    public function space()
    {
        return $this->belongsTo(Space::class, 'space_id', 'id');
    }

    public function role()
    {
        return $this->belongsTo(SpaceRole::class, 'role_id', 'id');
    }

    public function projects()
    {
        return $this->belongsToMany(Project::class, 'project_space_users',
             'space_user_id', 'project_id');
    }

    public function users()
    {
        $emails = SpaceUser::where('space_id', $this->space_id)->pluck('email')->toArray();
        return User::whereIn('email', $emails);
    }

    public function projectSpaceUsers()
    {
        return $this->hasMany(ProjectSpaceUser::class, 'space_user_id',
            'id');
    }
}
