<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\StatisticService;
use Illuminate\Http\Request;

class StatisticController extends Controller
{
    protected StatisticService $service;

    public function __construct(StatisticService $service)
    {
        $this->service = $service;
    }

    public function projectsBudget(Request $request)
    {
        return response()->json([
            'data' => $this->service->calculateProjectsBudget()
        ]);
    }

    public function companyBudget(Request $request)
    {
        return response()->json([
            'data' => $this->service->calculateCompanyBudget()
        ]);
    }

    public function totalBudget(Request $request)
    {
        return response()->json([
            'data' => $this->service->calculateTotalBudget()
        ]);
    }

    public function totalExpenses(Request $request)
    {
        if (in_array($request->month, [1, 3, 6, 12])) {
            return response()->json([
                'data' => $this->service->calculateTotalExpenses($request)
            ]);
        }
        return response()->json([
            'message' => 'Месяц не выбран (1, 3, 6, 12 мес.)'
        ]);
    }

    public function totalIncomes(Request $request)
    {
        if (in_array($request->month, [1, 3, 6, 12])) {
            return response()->json([
                'data' => $this->service->calculateTotalIncome($request)
            ]);
        }
        return response()->json([
            'message' => 'Месяц не выбран (1, 3, 6, 12 мес.)'
        ]);
    }

    public function forecast(Request $request)
    {
        return response()->json([
            'data' => $this->service->calculateForecast()
        ]);
    }
}
