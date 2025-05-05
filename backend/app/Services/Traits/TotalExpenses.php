<?php

namespace App\Services\Traits;

use App\Models\BudgetPayment;
use App\Models\FinanceProject;
use App\Models\Payment;
use Illuminate\Http\Request;

trait TotalExpenses
{
    public function totalExpensesTurnover(Request $request)
    {
        return abs(Payment::currentSpace()->paid()->expenses()->lastMonths($request->month)->sum('sum')) +
            abs(BudgetPayment::currentSpace()->paid()->expenses()->lastMonths($request->month)->sum('sum'));
    }

    public function lastExpensesPayment()
    {
        $payment = Payment::currentSpace()->paid()->expenses()->get()->last();
        $budgetPayment = BudgetPayment::currentSpace()->paid()->expenses()->get()->last();

        return $payment?->created_at->gt($budgetPayment?->created_at) ?
            abs((float)$payment?->sum) : abs((float)$budgetPayment?->sum);
    }

    public function totalExpensesPayments(Request $request)
    {
        return Payment::currentSpace()->paid()->expenses()->lastMonths($request->month)->count() +
            BudgetPayment::currentSpace()->paid()->expenses()->lastMonths($request->month)->count();
    }

    public function expensesDetail(Request $request)
    {
        $totalExpenses = abs(Payment::currentSpace()->paid()->expenses()->lastMonths($request->month)->sum('sum')) +
            abs(BudgetPayment::currentSpace()->paid()->expenses()->lastMonths($request->month)->sum('sum'));

        try {
            $expensesPercents = (100 / ($totalExpenses / abs(BudgetPayment::currentSpace()
                        ->paid()->expenses()->lastMonths($request->month)->sum('sum'))));
        } catch (\DivisionByZeroError) {
            $expensesPercents = 0;
        }

        $expenses = [
            'company_budget' => [
                'expenses' => abs(BudgetPayment::currentSpace()
                    ->paid()->expenses()->lastMonths($request->month)->sum('sum')),
                'percents' => round($expensesPercents, 2)
            ]
        ];

        $projects = FinanceProject::currentSpace()->get();

        foreach ($projects as $project) {
            $projectName = $project->project()->first()->name;
            $projectExpenses = abs(Payment::where('finance_project_id', $project->id)
                ->paid()->expenses()->lastMonths($request->month)->sum('sum'));

            try {
                $expensesProjectPercents = (100 / ($totalExpenses / $projectExpenses));
            } catch (\DivisionByZeroError) {
                $expensesProjectPercents = 0;
            }

            $expenses['finance_project.' . $project->id] = [
                'project_name' => $projectName,
                'project_expenses' => $projectExpenses,
                'percents' => round($expensesProjectPercents, 2)
            ];
        }

        return $expenses;
    }
}
