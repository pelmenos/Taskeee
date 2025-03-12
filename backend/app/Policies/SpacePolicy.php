<?php

namespace App\Policies;

use App\Models\SpaceUser;
use Illuminate\Auth\Access\Response;
use App\Models\Space;
use App\Models\User;

class SpacePolicy
{
    public function spaceAdmin(User $user, Space $space){

        return $user->id === $space->admin_id;
    }

    public function adminOrMemberSpace(User $user, Space $space){

        if($user->id === $space->admin_id){
            return true;
        }

        return SpaceUser::where('space_id', $space->id)->where('email', $user->email)->exists();
    }
}
