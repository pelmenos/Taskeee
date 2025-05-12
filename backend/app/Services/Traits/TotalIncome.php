<?php

namespace App\Services\Traits;

use App\Models\BudgetPayment;
use App\Models\FinanceProject;
use App\Models\Payment;
use Illuminate\Http\Request;

trait TotalIncome
{
    public function totalIncomeTurnover(Request $request)
    {
        return abs(Payment::currentSpace()->paid()->income()->lastMonths($request->month)->sum('sum')) +
            abs(BudgetPayment::currentSpace()->paid()->income()->lastMonths($request->month)->sum('sum'));
    }

    public function lastIncomePayment()
    {
        $payment = Payment::currentSpace()->paid()->income()->get()->last();
        $budgetPayment = BudgetPayment::currentSpace()->paid()->income()->get()->last();

        return $payment?->created_at->gt($budgetPayment?->created_at) ?
            abs((float)$payment?->sum) : abs((float)$budgetPayment?->sum);
    }

    public function totalIncomePayments(Request $request)
    {
        return Payment::currentSpace()->paid()->income()->lastMonths($request->month)->count() +
            BudgetPayment::currentSpace()->paid()->income()->lastMonths($request->month)->count();
    }

    public function incomeDetail(Request $request)
    {
        $totalIncome = Payment::currentSpace()->paid()->income()->lastMonths($request->month)->sum('sum') +
            BudgetPayment::currentSpace()->paid()->income()->lastMonths($request->month)->sum('sum');

        try {
            $incomePercents = (100 / ($totalIncome / abs(BudgetPayment::currentSpace()
                        ->paid()->income()->lastMonths($request->month)->sum('sum'))));
        } catch (\DivisionByZeroError) {
            $incomePercents = 0;
        }

        $income = [
            'company_budget' => [
                'income' => round((float)BudgetPayment::currentSpace()
                    ->paid()->income()->lastMonths($request->month)->sum('sum'), 2),
                'percents' => round($incomePercents, 2)
            ]
        ];

        $projects = FinanceProject::currentSpace()->get();

        foreach ($projects as $project) {
            $projectName = $project->project()->first()->name;
            $projectIncome = abs(Payment::where('finance_project_id', $project->id)
                ->paid()->income()->lastMonths($request->month)->sum('sum'));

            try {
                $incomeProjectPercents = (100 / ($totalIncome / $projectIncome));
            } catch (\DivisionByZeroError) {
                $incomeProjectPercents = 0;
            }

            $income['finance_project.' . $project->id] = [
                'project_name' => $projectName,
                'project_income' => round($projectIncome, 2),
                'percents' => round($incomeProjectPercents, 2)
            ];
        }

        return $income;
    }
}
