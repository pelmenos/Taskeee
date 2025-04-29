<?php

namespace App\Policies;

use App\Models\FinanceProject;
use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Auth\Access\HandlesAuthorization;

class FinanceProjectPolicy
{
    use HandlesAuthorization;

    public function view(User $user, FinanceProject $financeProject): Response
    {
        if ($user->getSpaceId() === $financeProject->space_id) {
            return $this->allow();
        }
        return $this->deny();
    }

    public function update(User $user, FinanceProject $financeProject): Response
    {
        if ($user->getSpaceId() === $financeProject->space_id) {
            return $this->allow();
        }
        return $this->deny();
    }

    public function delete(User $user, FinanceProject $financeProject): Response
    {
        if ($user->getSpaceId() === $financeProject->space_id) {
            return $this->allow();
        }
        return $this->deny();
    }
}
