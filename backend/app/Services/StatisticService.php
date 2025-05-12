<?php

namespace App\Services;

use App\Services\Traits\CompanyBudget;
use App\Services\Traits\Forecast;
use App\Services\Traits\ProjectsBudget;
use App\Services\Traits\TotalBudget;
use App\Services\Traits\TotalExpenses;
use App\Services\Traits\TotalIncome;
use Illuminate\Http\Request;

class StatisticService
{
    use ProjectsBudget, CompanyBudget, TotalBudget, TotalExpenses, TotalIncome, Forecast;

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

    public function calculateTotalBudget()
    {
        $expenses = $this->totalExpenses();
        $income = $this->totalIncome();
        $totalTurnover = $this->totalTurnover();
        $lastPayment = $this->totalLastPayment();
        $totalPayments = $this->totalPayments();
        $balance = $this->totalBalance();

        return [
            'total_turnover' => $totalTurnover,
            'last_payment' => $lastPayment,
            'total_payments' => $totalPayments,
            'expenses' => $expenses,
            'income' => $income,
            'balance' => $balance,
        ];
    }

    public function calculateTotalExpenses(Request $request)
    {
        $totalExpenses = $this->totalExpensesTurnover($request);
        $lastPayment = $this->lastExpensesPayment();
        $totalPayments = $this->totalExpensesPayments($request);
        $expensesDetail = $this->expensesDetail($request);

        return [
            'total_turnover' => $totalExpenses,
            'last_payment' => $lastPayment,
            'total_payments' => $totalPayments,
            'detail' => $expensesDetail
        ];
    }

    public function calculateTotalIncome(Request $request)
    {
        $totalIncome = $this->totalIncomeTurnover($request);
        $lastPayment = $this->lastIncomePayment();
        $totalPayments = $this->totalIncomePayments($request);
        $incomeDetail = $this->incomeDetail($request);

        return [
            'total_turnover' => $totalIncome,
            'last_payment' => $lastPayment,
            'total_payments' => $totalPayments,
            'detail' => $incomeDetail
        ];
    }

    public function calculateForecast()
    {
        $totalBalance = $this->totalBalanceForecast();
        $projectBudget = $this->projectsBalanceForecast();
        $companyBudget = $this->companyBalanceForecast();
        $totalExpenses = $this->expensesForecast();
        $totalIncome = $this->incomeForecast();
        $totalPayments = $this->paymentsForecast();

        return [
            'total_balance' => $totalBalance,
            'project_budget' => $projectBudget,
            'company_budget' => $companyBudget,
            'total_expenses' => $totalExpenses,
            'total_income' => $totalIncome,
            'total_payments' => $totalPayments
        ];
    }
}
