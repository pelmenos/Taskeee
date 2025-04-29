<?php

namespace App\Services;

use App\Models\Payment;

class StatisticService
{
    public function calculateBudget()
    {
        $expenses = $this->expenses();
        $income = $this->income();
        $totalTurnover = $this->totalTurnover();
        $lastPayment = $this->lastPayment();
        $totalPayments = $this->totalPayments();
        $balance = $this->balance();

        return [
            'total_turnover' => $totalTurnover,
            'last_payment' => $lastPayment,
            'total_payments' => $totalPayments,
            'expenses' => $expenses,
            'income' => $income,
            'balance' => $balance,
        ];
    }

    private function expenses()
    {
        $expensesPercents = 100 / ($this->totalTurnover() /
                abs(Payment::currentSpace()->paid()->expenses()->sum('sum')));
        $expensesCount = Payment::currentSpace()->paid()->expenses()->count();
        $expensesSum = abs(Payment::currentSpace()->paid()->expenses()->sum('sum'));

        return [
            'sum' => $expensesSum,
            'percents' => round($expensesPercents),
            'count' => $expensesCount,
        ];
    }

    private function income()
    {
        $incomePercents = 100 / ($this->totalTurnover() /
                Payment::currentSpace()->paid()->income()->sum('sum'));
        $incomeCount = Payment::currentSpace()->paid()->income()->count();
        $incomeSum = (float)Payment::currentSpace()->paid()->income()->sum('sum');

        return [
            'sum' => $incomeSum,
            'percents' => round($incomePercents),
            'count' => $incomeCount
        ];
    }

    private function totalTurnover()
    {
        return Payment::currentSpace()->paid()->income()->sum('sum') +
            abs(Payment::currentSpace()->expenses()->sum('sum'));
    }

    private function lastPayment()
    {
        return (float)Payment::currentSpace()->paid()->get()->last()->sum;
    }

    private function totalPayments()
    {
        return Payment::currentSpace()->paid()->count();
    }

    private function balance()
    {
        return (float)Payment::currentSpace()->paid()->sum('sum');
    }
}
