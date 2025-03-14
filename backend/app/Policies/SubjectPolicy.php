<?php

namespace App\Policies;

use App\Models\Subject;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class SubjectPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Subject $subject): Response
    {
        if ($user->getSpaceId() === $subject->space_id) {
            return $this->allow();
        }
        return $this->deny();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Subject $subject): Response
    {
        if ($user->getSpaceId() === $subject->space_id) {
            return $this->allow();
        }
        return $this->deny();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Subject $subject): Response
    {
        if ($user->getSpaceId() === $subject->space_id) {
            return $this->allow();
        }
        return $this->deny();
    }
}
