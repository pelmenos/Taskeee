<?php

declare(strict_types=1);

namespace App\Policies\API\V1;

use App\Models\Space;
use App\Models\Space\SpaceUser;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

final class SpacePolicy
{
    use HandlesAuthorization;

    /**
     * @param User $user
     * @return bool
     */
    public function list(User $user): bool
    {
        return true;
    }

    /**
     * @param User $user
     * @return bool
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * @param User $user
     * @param Space $space
     * @return bool
     */
    public function item(User $user, Space $space): bool
    {
        return true;
    }

    /**
     * @param User $user
     * @param Space $space
     * @return bool
     */
    public function update(User $user, Space $space): bool
    {
        return true;
    }

    /**
     * @param User $user
     * @param Space $space
     * @return bool
     */
    public function delete(User $user, Space $space): bool
    {
        return true;
    }

    public function spaceAdmin(User $user, Space $space)
    {

        return $user->id === $space->admin_id;
    }

    public function adminOrMemberSpace(User $user, Space $space)
    {

        if ($user->id === $space->admin_id) {
            return true;
        }

        return SpaceUser::where('space_id', $space->id)->where('email', $user->email)->exists();
    }

    public function memberSpaceWithProjectsAccess(User $user, Space $space)
    {

        $spaceUser = SpaceUser::where('space_id', $space->id)->where('email', $user->email)->first();

        if (!$spaceUser) {
            return false;
        }

        return (($spaceUser->role->permissions['projects_access'] === true) ||
            ($spaceUser->role->permissions['full_access'] === true));
    }
}
