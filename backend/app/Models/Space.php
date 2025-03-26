<?php

namespace App\Models;

use Askedio\SoftCascade\Traits\SoftCascadeTrait;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Space extends Model
{
    use HasFactory, HasUuids, SoftDeletes, SoftCascadeTrait;

    public $incrementing = false;

    public $keyType = 'string';

    protected $softCascade = ['spaceUsers', 'spaceRoles', 'projects'];

    protected $fillable = [
        'name',
        'description',
        'avatar',
        'admin_id',
        'tariff'
    ];

    public function financesProjects()
    {
        return $this->hasMany(FinanceProject::class);
    }

    public function subjects()
    {
        return $this->hasMany(Subject::class);
    }

    public function conditions()
    {
        return $this->hasMany(Condition::class);
    }

    public function projects()
    {
        return $this->hasMany(Project::class, 'space_id', 'id');
    }

    public function spaceRoles()
    {
        return $this->hasMany(SpaceRole::class, 'space_id', 'id');
    }

    public function spaceUsers()
    {
        return $this->hasMany(SpaceUser::class, 'space_id', 'id');
    }

    public function inviteTokens()
    {
        return $this->hasMany(InviteToken::class, 'space_id', 'id');
    }
}
