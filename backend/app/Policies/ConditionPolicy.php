<?php

namespace App\Policies;

use App\Models\Condition;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class ConditionPolicy
{
    use HandlesAuthorization;

    public function view(User $user, Condition $condition): Response
    {
        if ($user->getSpaceId() === $condition->space_id && auth()->check()) {
            return $this->allow();
        }
        return $this->deny();
    }

    public function update(User $user, Condition $condition): Response
    {
        if ($user->getSpaceId() === $condition->space_id && auth()->check()) {
            return $this->allow();
        }
        return $this->deny();
    }

    public function delete(User $user, Condition $condition): Response
    {
        if ($user->getSpaceId() === $condition->space_id && auth()->check()) {
            return $this->allow();
        }
        return $this->deny();
    }
}
