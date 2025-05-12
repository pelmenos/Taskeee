<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBudgetPaymentRequest;
use App\Http\Requests\UpdateBudgetPaymentRequest;
use App\Http\Resources\BudgetPaymentResource;
use App\Models\BudgetPayment;
use App\Models\BudgetPaymentStatus;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class BudgetPaymentController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('inSpaceEntity', auth()->user());
        $budgetPayment = BudgetPayment::currentSpace();

        if ($term = $request->q) {
            $budgetPayment = $budgetPayment->withSearch($term);
        }

        return response()->json([
            'data' => BudgetPaymentResource::collection(
                BudgetPayment::statusOrder(
                    $budgetPayment->get(),
                    ['Ожидание', 'План', 'Заморожено', 'Оплачено']
                )
            )
        ]);
    }

    public function view(Request $request, $budgetPaymentId)
    {
        if ($budgetPayment = BudgetPayment::find($budgetPaymentId)) {
            $this->authorize('view', $budgetPayment);
            return response()->json([
                'data' => BudgetPaymentResource::make($budgetPayment)
            ]);
        }

        return response()->json([
            'message' => 'Платёж не найден'
        ], Response::HTTP_NOT_FOUND);
    }

    public function store(StoreBudgetPaymentRequest $request)
    {
        $this->authorize('inSpaceEntity', auth()->user());
        $payment = BudgetPayment::create([
            ...$request->all(),
            'type' => $request->input('sum') >= 0 ? 'Доходы' : 'Расходы',
            'space_id' => auth()->user()->getSpaceId()
        ]);

        return response()->json([
            'data' => BudgetPaymentResource::make($payment)
        ], Response::HTTP_CREATED);
    }

    public function update(UpdateBudgetPaymentRequest $request, $budgetPaymentId)
    {
        if ($budgetPayment = BudgetPayment::find($budgetPaymentId)) {
            $this->authorize('update', $budgetPayment);
            $budgetPayment->update($request->all());

            return response()->json([
                'data' => BudgetPaymentResource::make($budgetPayment)
            ]);
        }

        return response()->json([
            'message' => 'Платёж не найден'
        ], Response::HTTP_NOT_FOUND);
    }

    public function delete(Request $request, $budgetPaymentId)
    {
        if ($budgetPayment = BudgetPayment::find($budgetPaymentId)) {
            $this->authorize('delete', $budgetPayment);
            $budgetPayment->delete();
            return response()->json([
                'data' => BudgetPaymentResource::make($budgetPayment)
            ]);
        }

        return response()->json([
            'message' => 'Платёж не найден'
        ], Response::HTTP_NOT_FOUND);
    }

    public function duplicate(Request $request, $budgetPaymentId)
    {
        if ($budgetPayment = BudgetPayment::find($budgetPaymentId)) {
            $this->authorize('duplicate', $budgetPayment);
            $duplicate = BudgetPayment::create($budgetPayment->toArray());
            return response()->json([
                'data' => BudgetPaymentResource::make($duplicate)
            ], Response::HTTP_CREATED);
        }

        return response()->json([
            'message' => 'Платёж не найден'
        ], Response::HTTP_NOT_FOUND);
    }

    public function paidStatus(Request $request, $budgetPaymentId)
    {
        if ($budgetPayment = BudgetPayment::find($budgetPaymentId)) {
            $this->authorize('paidStatus', $budgetPayment);
            $budgetPayment->update([
                'status_id' => BudgetPaymentStatus::where('name', 'Оплачено')
                    ->first()->id
            ]);

            return response()->json([
                'data' => BudgetPaymentResource::make($budgetPayment)
            ]);
        }

        return response()->json([
            'message' => 'Платёж не найден'
        ], Response::HTTP_NOT_FOUND);
    }
}
