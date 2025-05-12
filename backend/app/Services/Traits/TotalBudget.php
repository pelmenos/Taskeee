<?php

namespace App\Services\Traits;

use App\Models\BudgetPayment;
use App\Models\Payment;

trait TotalBudget
{
    use ProjectsBudget, CompanyBudget;

    public function totalExpenses()
    {
        $projectExpenses = $this->projectsExpenses();
        $companyExpenses = $this->companyExpenses();


        try {
            $expensesPercents = 100 / ($this->totalTurnover() /
                    ($projectExpenses['sum'] + $companyExpenses['sum']));
        } catch (\DivisionByZeroError) {
            $expensesPercents = 0;
        }

        $expensesCount = $projectExpenses['count'] + $companyExpenses['count'];
        $expensesSum = $projectExpenses['sum'] + $companyExpenses['sum'];

        return [
            'sum' => $expensesSum,
            'percents' => round($expensesPercents, 2),
            'count' => $expensesCount
        ];
    }

    public function totalIncome()
    {
        $projectIncome = $this->projectsIncome();
        $companyIncome = $this->companyIncome();

        try {
            $incomePercents = 100 / ($this->totalTurnover() /
                    ($projectIncome['sum'] + $companyIncome['sum']));
        } catch (\DivisionByZeroError) {
            $incomePercents = 0;
        }

        $incomeCount = $projectIncome['count'] + $companyIncome['count'];
        $incomeSum = $projectIncome['sum'] + $companyIncome['sum'];

        return [
            'sum' => $incomeSum,
            'percents' => round($incomePercents, 2),
            'count' => $incomeCount
        ];
    }

    public function totalTurnover()
    {
        return $this->projectsTotalTurnover() + $this->companyTotalTurnover();
    }

    public function totalLastPayment()
    {
        $payment = Payment::currentSpace()->paid()->get()->last();
        $budgetPayment = BudgetPayment::currentSpace()->paid()->get()->last();

        return $payment?->created_at->gt($budgetPayment?->created_at) ?
            (float)$payment?->sum : (float)$budgetPayment?->sum;
    }

    public function totalPayments()
    {
        return $this->projectsTotalPayments() + $this->companyTotalPayments();
    }

    public function totalBalance()
    {
        return $this->projectsBalance() + $this->companyBalance();
    }
}
