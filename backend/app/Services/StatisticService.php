<?php

namespace App\Services;

use App\Services\Traits\CompanyBudget;
use App\Services\Traits\ProjectsBudget;

class StatisticService
{
    use ProjectsBudget, CompanyBudget;

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

    public function calculateCompanyBudget()
    {
        $expenses = $this->companyExpenses();
        $income = $this->companyIncome();
        $totalTurnover = $this->companyTotalTurnover();
        $lastPayment = $this->companyLastPayment();
        $totalPayments = $this->companyTotalPayments();
        $balance = $this->companyBalance();

        return [
            'total_turnover' => $totalTurnover,
            'last_payment' => $lastPayment,
            'total_payments' => $totalPayments,
            'expenses' => $expenses,
            'income' => $income,
            'balance' => $balance,
        ];
    }
}
