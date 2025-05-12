<?php

namespace App\Services\Traits;

use App\Models\Payment;

trait ProjectsBudget
{
    public function projectsExpenses()
    {
        try {
            $expensesPercents = 100 / ($this->projectsTotalTurnover() /
                    abs(Payment::currentSpace()->paid()->expenses()->sum('sum')));
        } catch (\DivisionByZeroError) {
            $expensesPercents = 0;
        }

        $expensesCount = Payment::currentSpace()->paid()->expenses()->count();
        $expensesSum = abs(Payment::currentSpace()->paid()->expenses()->sum('sum'));

        return [
            'sum' => round($expensesSum, 2),
            'percents' => round($expensesPercents, 2),
            'count' => $expensesCount,
        ];
    }

    public function projectsIncome()
    {
        try {
            $incomePercents = 100 / ($this->projectsTotalTurnover() /
                    Payment::currentSpace()->paid()->income()->sum('sum'));
        } catch (\DivisionByZeroError) {
            $incomePercents = 0;
        }

        $incomeCount = Payment::currentSpace()->paid()->income()->count();
        $incomeSum = (float)Payment::currentSpace()->paid()->income()->sum('sum');

        return [
            'sum' => round($incomeSum, 2),
            'percents' => round($incomePercents, 2),
            'count' => $incomeCount
        ];
    }

    public function projectsTotalTurnover()
    {
        return Payment::currentSpace()->paid()->income()->sum('sum') +
            abs(Payment::currentSpace()->paid()->expenses()->sum('sum'));
    }

    public function projectsLastPayment()
    {
        return (float)Payment::currentSpace()->paid()->get()->last()?->sum;
    }

    public function projectsTotalPayments()
    {
        return Payment::currentSpace()->paid()->count();
    }

    public function projectsBalance()
    {
        return (float)Payment::currentSpace()->paid()->sum('sum');
    }
}
