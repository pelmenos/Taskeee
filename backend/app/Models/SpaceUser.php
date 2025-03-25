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
}
