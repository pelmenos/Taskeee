<?php

namespace App\Policies;

use App\Models\Project;
use App\Models\ProjectSpaceUser;
use App\Models\Space;
use App\Models\SpaceRole;
use App\Models\SpaceUser;
use App\Models\User;

class ProjectPolicy
{
    public function adminOrMemberSpaceWithProjectsAccess(User $user, Project $project){

        $space = Space::find($project->space_id);

        if($user->id === $space->admin_id){
            return true;
        }

        $spaceUser = SpaceUser::where('space_id', $space->id)->where('email', $user->email)->first();

        if(!$spaceUser){
            return false;
        }

        return (($spaceUser->role->permissions['projects_access'] === true) ||
                ($spaceUser->role->permissions['full_access'] === true)) &&
            (ProjectSpaceUser::where('project_id', $project->id)
                ->where('space_user_id', $spaceUser->id)->exists());
    }
}
