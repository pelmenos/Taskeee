<?php

declare(strict_types=1);

namespace App\Models;

use App\Models\Space\SpaceRole;
use App\Models\Space\SpaceUser;
use App\Traits\ForModels\HasQueryFilterTrait;
use Askedio\SoftCascade\Traits\SoftCascadeTrait;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

final class Space extends Model
{
    use HasUuids,
        SoftDeletes,
        SoftCascadeTrait,
        HasQueryFilterTrait;

    protected $fillable = [
        'owner_id',
        'name',
        'description',
        'tariff'
    ];

    protected $softCascade = [
        'spaceUsers',
        'spaceRoles',
        'projects',
    ];

    /**
     * @return BelongsTo
     */
    public function admin(): BelongsTo
    {
        return $this->belongsTo(User::class, 'admin_id', 'id');
    }

    /**
     * @return HasMany
     */
    public function roles(): HasMany
    {
        return $this->hasMany(SpaceRole::class, 'space_id', 'id');
    }

    /**
     * @return HasMany
     */
    public function users(): HasMany
    {
        return $this->hasMany(SpaceUser::class, 'space_id', 'id');
    }

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

    public function inviteTokens()
    {
        return $this->hasMany(InviteToken::class, 'space_id', 'id');
    }
}
