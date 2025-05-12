<?php

namespace App\Policies;

use App\Models\Payment;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class PaymentPolicy
{
    use HandlesAuthorization;

    public function view(User $user, Payment $payment): Response
    {
        if ($user->getSpaceId() === $payment->space_id && auth()->check()) {
            return $this->allow();
        }
        return $this->deny();
    }

    public function update(User $user, Payment $payment): Response
    {
        if ($user->getSpaceId() === $payment->space_id && auth()->check()) {
            return $this->allow();
        }
        return $this->deny();
    }

    public function delete(User $user, Payment $payment): Response
    {
        if ($user->getSpaceId() === $payment->space_id && auth()->check()) {
            return $this->allow();
        }
        return $this->deny();
    }

    public function duplicate(User $user, Payment $payment): Response
    {
        if ($user->getSpaceId() === $payment->space_id && auth()->check()) {
            return $this->allow();
        }
        return $this->deny();
    }

    public function paidStatus(User $user, Payment $payment): Response
    {
        if ($user->getSpaceId() === $payment->space_id && auth()->check()) {
            return $this->allow();
        }
        return $this->deny();
    }
}
