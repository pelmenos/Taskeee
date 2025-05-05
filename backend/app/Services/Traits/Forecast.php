<?php

namespace App\Services\Traits;

use App\Models\BudgetPayment;
use App\Models\Payment;
use Carbon\Carbon;

trait Forecast
{
    public function totalBalanceForecast()
    {
        $lastMonth = Payment::whereMonth('created_at', Carbon::now()->subMonths()->month)
                ->currentSpace()->paid()->sum('sum') +
            BudgetPayment::whereMonth('created_at', Carbon::now()->subMonths()->month)
                ->currentSpace()->paid()->sum('sum');

        $beforeLastMonth = Payment::whereMonth('created_at', Carbon::now()->subMonths(2)->month)
                ->currentSpace()->paid()->sum('sum') +
            BudgetPayment::whereMonth('created_at', Carbon::now()->subMonths(2)->month)
                ->currentSpace()->paid()->sum('sum');

        try {
            $prognosis = ($lastMonth / $beforeLastMonth) * $lastMonth;
        } catch (\DivisionByZeroError) {
            $prognosis = 0;
        }

        return (int)round($prognosis);
    }

    public function projectsBalanceForecast()
    {
        $lastMonth = Payment::whereMonth('created_at', Carbon::now()->subMonths()->month)
                ->currentSpace()->paid()->sum('sum');

        $beforeLastMonth = Payment::whereMonth('created_at', Carbon::now()->subMonths(2)->month)
                ->currentSpace()->paid()->sum('sum');

        try {
            $prognosis = ($lastMonth / $beforeLastMonth) * $lastMonth;
        } catch (\DivisionByZeroError) {
            $prognosis = 0;
        }

        return (int)round($prognosis);
    }

    public function companyBalanceForecast()
    {
        $lastMonth = BudgetPayment::whereMonth('created_at', Carbon::now()->subMonths()->month)
            ->currentSpace()->paid()->sum('sum');

        $beforeLastMonth = BudgetPayment::whereMonth('created_at', Carbon::now()->subMonths(2)->month)
            ->currentSpace()->paid()->sum('sum');

        try {
            $prognosis = ($lastMonth / $beforeLastMonth) * $lastMonth;
        } catch (\DivisionByZeroError) {
            $prognosis = 0;
        }

        return (int)round($prognosis);
    }

    public function expensesForecast()
    {
        $lastMonth = abs(Payment::whereMonth('created_at', Carbon::now()->subMonths()->month)
                ->currentSpace()->paid()->expenses()->sum('sum')) +
            abs(BudgetPayment::whereMonth('created_at', Carbon::now()->subMonths()->month)
                ->currentSpace()->paid()->expenses()->sum('sum'));

        $beforeLastMonth = abs(Payment::whereMonth('created_at', Carbon::now()->subMonths(2)->month)
                ->currentSpace()->paid()->expenses()->sum('sum')) +
            abs(BudgetPayment::whereMonth('created_at', Carbon::now()->subMonths(2)->month)
                ->currentSpace()->paid()->expenses()->sum('sum'));

        try {
            $prognosis = ($lastMonth / $beforeLastMonth) * $lastMonth;
        } catch (\DivisionByZeroError) {
            $prognosis = 0;
        }

        return (int)round($prognosis);
    }

    public function incomeForecast()
    {
        $lastMonth = Payment::whereMonth('created_at', Carbon::now()->subMonths()->month)
                ->currentSpace()->paid()->income()->sum('sum') +
            BudgetPayment::whereMonth('created_at', Carbon::now()->subMonths()->month)
                ->currentSpace()->paid()->income()->sum('sum');

        $beforeLastMonth = Payment::whereMonth('created_at', Carbon::now()->subMonths(2)->month)
                ->currentSpace()->paid()->income()->sum('sum') +
            BudgetPayment::whereMonth('created_at', Carbon::now()->subMonths(2)->month)
                ->currentSpace()->paid()->income()->sum('sum');

        try {
            $prognosis = ($lastMonth / $beforeLastMonth) * $lastMonth;
        } catch (\DivisionByZeroError) {
            $prognosis = 0;
        }

        return (int)round($prognosis);
    }

    public function paymentsForecast()
    {
        $lastMonth = Payment::whereMonth('created_at', Carbon::now()->subMonths()->month)
                ->currentSpace()->paid()->count() +
            BudgetPayment::whereMonth('created_at', Carbon::now()->subMonths()->month)
                ->currentSpace()->paid()->count();

        $beforeLastMonth = Payment::whereMonth('created_at', Carbon::now()->subMonths(2)->month)
                ->currentSpace()->paid()->count() +
            BudgetPayment::whereMonth('created_at', Carbon::now()->subMonths(2)->month)
                ->currentSpace()->paid()->count();

        try {
            $prognosis = ($lastMonth / $beforeLastMonth) * $lastMonth;
        } catch (\DivisionByZeroError) {
            $prognosis = 0;
        }

        return (int)round($prognosis);
    }
}
