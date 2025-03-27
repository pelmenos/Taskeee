<?php

namespace App\Policies;

use App\Models\SpaceRole;
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

    public function memberSpaceWithProjectsAccess(User $user, Space $space){

        $spaceUser = SpaceUser::where('space_id', $space->id)->where('email', $user->email)->first();

        if(!$spaceUser){
            return false;
        }

        return (($spaceUser->role->permissions['projects_access'] === true) ||
            ($spaceUser->role->permissions['full_access'] === true)) ;
    }
}
