<?php

namespace App\Services\Traits;

use App\Models\BudgetPayment;

trait CompanyBudget
{
    public function companyExpenses()
    {
        try {
            $expensesPercents = 100 / ($this->companyTotalTurnover() /
                    abs(BudgetPayment::currentSpace()->paid()->expenses()->sum('sum')));
        } catch (\DivisionByZeroError) {
            $expensesPercents = 0;
        }

        $expensesCount = BudgetPayment::currentSpace()->paid()->expenses()->count();
        $expensesSum = abs(BudgetPayment::currentSpace()->paid()->expenses()->sum('sum'));

        return [
            'sum' => round($expensesSum, 2),
            'percents' => round($expensesPercents, 2),
            'count' => $expensesCount,
        ];
    }

    public function companyIncome()
    {
        try {
            $incomePercents = 100 / ($this->companyTotalTurnover() /
                    BudgetPayment::currentSpace()->paid()->income()->sum('sum'));
        } catch (\DivisionByZeroError) {
            $incomePercents = 0;
        }

        $incomeCount = BudgetPayment::currentSpace()->paid()->income()->count();
        $incomeSum = (float)BudgetPayment::currentSpace()->paid()->income()->sum('sum');

        return [
            'sum' => round($incomeSum, 2),
            'percents' => round($incomePercents, 2),
            'count' => $incomeCount
        ];
    }

    public function companyTotalTurnover()
    {
        return BudgetPayment::currentSpace()->paid()->income()->sum('sum') +
            abs(BudgetPayment::currentSpace()->paid()->expenses()->sum('sum'));
    }

    public function companyLastPayment()
    {
        return (float)BudgetPayment::currentSpace()->paid()->get()->last()?->sum;
    }

    public function companyTotalPayments()
    {
        return BudgetPayment::currentSpace()->paid()->count();
    }

    public function companyBalance()
    {
        return (float)BudgetPayment::currentSpace()->paid()->sum('sum');
    }
}
