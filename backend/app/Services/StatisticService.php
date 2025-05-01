<?php

namespace App\Services;

use App\Models\Payment;

class StatisticService
{
    public function calculateProjectsBudget()
    {
        $expenses = $this->projectsExpenses();
        $income = $this->projectsIncome();
        $totalTurnover = $this->projectsTotalTurnover();
        $lastPayment = $this->projectsLastPayment();
        $totalPayments = $this->projectsTotalPayments();
        $balance = $this->projectsBalance();

        return [
            'total_turnover' => $totalTurnover,
            'last_payment' => $lastPayment,
            'total_payments' => $totalPayments,
            'expenses' => $expenses,
            'income' => $income,
            'balance' => $balance,
        ];
    }

    private function projectsExpenses()
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
            'sum' => $expensesSum,
            'percents' => round($expensesPercents, 2),
            'count' => $expensesCount,
        ];
    }

    private function projectsIncome()
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
            'sum' => $incomeSum,
            'percents' => round($incomePercents, 2),
            'count' => $incomeCount
        ];
    }

    private function projectsTotalTurnover()
    {
        return Payment::currentSpace()->paid()->income()->sum('sum') +
            abs(Payment::currentSpace()->paid()->expenses()->sum('sum'));
    }

    private function projectsLastPayment()
    {
        return (float)Payment::currentSpace()->paid()->get()->last()?->sum;
    }

    private function projectsTotalPayments()
    {
        return Payment::currentSpace()->paid()->count();
    }

    private function projectsBalance()
    {
        return (float)Payment::currentSpace()->paid()->sum('sum');
    }
}
