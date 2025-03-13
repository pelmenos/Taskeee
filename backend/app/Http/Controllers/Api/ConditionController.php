<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreConditionRequest;
use App\Http\Requests\UpdateConditionRequest;
use App\Models\Condition;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ConditionController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('inSpaceEntity', auth()->user());
        return response()->json([
            'data' => Condition::currentSpace()->get()
        ]);
    }

    public function view(Request $request, $condition_id)
    {
        if ($condition = Condition::find($condition_id)) {
            $this->authorize('view', $condition);
            return response()->json([
                'data' => $condition
            ]);
        }

        return response()->json([
            'message' => 'Предмет не найден'
        ], Response::HTTP_NOT_FOUND);
    }

    public function store(StoreConditionRequest $request)
    {
        $this->authorize('inSpaceEntity', auth()->user());
        $condition = Condition::create([
            'name' => $request->input('name'),
            'space_id' => auth()->user()->getSpaceId()
        ]);

        return response()->json([
            'data' => $condition
        ], Response::HTTP_CREATED);
    }

    public function update(UpdateConditionRequest $request, $condition_id)
    {
        if ($condition = Condition::find($condition_id)) {
            $this->authorize('update', $condition);
            $condition->update($request->all());

            return response()->json([
                'data' => $condition
            ]);
        }

        return response()->json([
            'message' => 'Предмет не найден'
        ], Response::HTTP_NOT_FOUND);
    }

    public function delete(Request $request, $condition_id)
    {
        if ($condition = Condition::find($condition_id)) {
            $this->authorize('delete', $condition);
            $condition->delete();

            return response()->json([
                'data' => $condition
            ]);
        }

        return response()->json([
            'message' => 'Предмет не найден'
        ], Response::HTTP_NOT_FOUND);
    }
}
