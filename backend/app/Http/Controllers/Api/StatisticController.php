<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Services\StatisticService;
use Illuminate\Http\Request;

class StatisticController extends Controller
{
    protected StatisticService $service;

    public function __construct(StatisticService $service)
    {
        $this->service = $service;
    }

    public function projectsBudget()
    {
        return response()->json([
            'data' => $this->service->calculateProjectsBudget()
        ]);
    }


}
