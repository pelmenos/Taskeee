<?php

namespace App\Models;

use Askedio\SoftCascade\Traits\SoftCascadeTrait;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SpaceRole extends Model
{
    use HasFactory, HasUuids, SoftDeletes, SoftCascadeTrait;

    public $incrementing = false;

    public $keyType = 'string';

    protected $softCascade = ['spaceUsers'];

    protected $fillable = [
        'space_id',
        'name',
        'description',
        'permissions'
    ];

    protected $casts = [
        'permissions' => 'array',
    ];

    public function space()
    {
        return $this->belongsTo(Space::class, 'space_id', 'id');
    }

    public function spaceUsers()
    {
        return $this->hasMany(SpaceUser::class, 'role_id', 'id');
    }

    public function inviteTokens()
    {
        return $this->hasMany(InviteToken::class, 'role_id', 'id');
    }
}
