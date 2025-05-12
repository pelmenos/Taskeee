<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    public function inSpaceEntity(?User $user)
    {
        if ($user->getSpaceId() && auth()->check()) {
            return $this->allow();
        }
        return $this->deny();
    }
}
