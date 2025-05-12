<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePaymentRequest;
use App\Http\Requests\UpdatePaymentRequest;
use App\Http\Resources\PaymentResource;
use App\Models\Payment;
use App\Models\PaymentStatus;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PaymentController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('inSpaceEntity', auth()->user());
        $payment = Payment::currentSpace();

        if ($term = $request->q) {
            $payment = $payment->withSearch($term);
        }

        return response()->json([
            'data' => PaymentResource::collection(
                Payment::statusOrder(
                    $payment->get(),
                    ['Ожидание', 'План', 'Заморожено', 'Оплачено']
                )
            )
        ]);
    }

    public function view(Request $request, $paymentId)
    {
        if ($payment = Payment::find($paymentId)) {
            $this->authorize('view', $payment);
            return response()->json([
                'data' => PaymentResource::make($payment)
            ]);
        }

        return response()->json([
            'message' => 'Платёж не найден'
        ], Response::HTTP_NOT_FOUND);
    }

    public function store(StorePaymentRequest $request)
    {
        $this->authorize('inSpaceEntity', auth()->user());
        $payment = Payment::create([
            ...$request->all(),
            'type' => $request->input('sum') >= 0 ? 'Доходы' : 'Расходы',
            'space_id' => auth()->user()->getSpaceId()
        ]);

        return response()->json([
            'data' => PaymentResource::make($payment)
        ], Response::HTTP_CREATED);
    }

    public function update(UpdatePaymentRequest $request, $paymentId)
    {
        if ($payment = Payment::find($paymentId)) {
            $this->authorize('update', $payment);
            $payment->update($request->all());

            return response()->json([
                'data' => PaymentResource::make($payment)
            ]);
        }

        return response()->json([
            'message' => 'Платёж не найден'
        ], Response::HTTP_NOT_FOUND);
    }

    public function delete(Request $request, $paymentId)
    {
        if ($payment = Payment::find($paymentId)) {
            $this->authorize('delete', $payment);
            $payment->delete();
            return response()->json([
                'data' => PaymentResource::make($payment)
            ]);
        }

        return response()->json([
            'message' => 'Платёж не найден'
        ], Response::HTTP_NOT_FOUND);
    }

    public function duplicate(Request $request, $paymentId)
    {
        if ($payment = Payment::find($paymentId)) {
            $this->authorize('duplicate', $payment);
            $duplicate = Payment::create($payment->toArray());
            return response()->json([
                'data' => PaymentResource::make($duplicate)
            ], Response::HTTP_CREATED);
        }

        return response()->json([
            'message' => 'Платёж не найден'
        ], Response::HTTP_NOT_FOUND);
    }

    public function paidStatus(Request $request, $paymentId)
    {
        if ($payment = Payment::find($paymentId)) {
            $this->authorize('paidStatus', $payment);
            $payment->update([
                'status_id' => PaymentStatus::where('name', 'Оплачено')
                    ->first()->id
            ]);

            return response()->json([
                'data' => PaymentResource::make($payment)
            ]);
        }

        return response()->json([
            'message' => 'Платёж не найден'
        ], Response::HTTP_NOT_FOUND);
    }
}
