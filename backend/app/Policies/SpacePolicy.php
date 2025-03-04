<?php

namespace App\Policies;

use Illuminate\Auth\Access\Response;
use App\Models\Space;
use App\Models\User;

class SpacePolicy
{
    public function spaceAdmin(User $user, Space $space){

        return $user->id === $space->admin_id;
    }
}
