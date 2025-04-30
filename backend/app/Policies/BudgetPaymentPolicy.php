<?php

namespace App\Policies;

use App\Models\BudgetPayment;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class BudgetPaymentPolicy
{
    use HandlesAuthorization;

    public function view(User $user, BudgetPayment $budgetPayment): Response
    {
        if ($user->getSpaceId() === $budgetPayment->space_id && auth()->check()) {
            return $this->allow();
        }
        return $this->deny();
    }

    public function update(User $user, BudgetPayment $budgetPayment): Response
    {
        if ($user->getSpaceId() === $budgetPayment->space_id && auth()->check()) {
            return $this->allow();
        }
        return $this->deny();
    }

    public function delete(User $user, BudgetPayment $budgetPayment): Response
    {
        if ($user->getSpaceId() === $budgetPayment->space_id && auth()->check()) {
            return $this->allow();
        }
        return $this->deny();
    }

    public function duplicate(User $user, BudgetPayment $budgetPayment): Response
    {
        if ($user->getSpaceId() === $budgetPayment->space_id && auth()->check()) {
            return $this->allow();
        }
        return $this->deny();
    }

    public function paidStatus(User $user, BudgetPayment $budgetPayment): Response
    {
        if ($user->getSpaceId() === $budgetPayment->space_id && auth()->check()) {
            return $this->allow();
        }
        return $this->deny();
    }
}
