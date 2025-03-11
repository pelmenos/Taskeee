<?php

namespace App\Policies;

use App\Models\Condition;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class ConditionPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Condition $condition): Response
    {
        if ($user->getSpaceId() === $condition->space_id) {
            return $this->allow();
        }
        return $this->deny();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Condition $condition): Response
    {
        if ($user->getSpaceId() === $condition->space_id) {
            return $this->allow();
        }
        return $this->deny();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Condition $condition): Response
    {
        if ($user->getSpaceId() === $condition->space_id) {
            return $this->allow();
        }
        return $this->deny();
    }
}
