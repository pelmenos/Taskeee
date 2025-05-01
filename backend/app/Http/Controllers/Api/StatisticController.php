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
}
