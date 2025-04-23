<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSubjectRequest;
use App\Http\Requests\UpdateSubjectRequest;
use App\Models\Subject;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SubjectController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('inSpaceEntity', auth()->user());
        return response()->json([
            'data' => Subject::currentSpace()->get()
        ]);
    }

    public function view(Request $request, $subject_id)
    {
        if ($subject = Subject::find($subject_id)) {
            $this->authorize('view', $subject);
            return response()->json([
                'data' => $subject
            ]);
        }

        return response()->json([
            'message' => 'Предмет не найден'
        ], Response::HTTP_NOT_FOUND);
    }

    public function store(StoreSubjectRequest $request)
    {
        $this->authorize('inSpaceEntity', auth()->user());
        $subject = Subject::create([
            ...$request->all(),
            'space_id' => auth()->user()->getSpaceId()
        ]);

        return response()->json([
            'data' => $subject
        ], Response::HTTP_CREATED);
    }

    public function update(UpdateSubjectRequest $request, $subject_id)
    {
        if ($subject = Subject::find($subject_id)) {
            $this->authorize('update', $subject);
            $subject->update($request->all());

            return response()->json([
                'data' => $subject
            ]);
        }

        return response()->json([
            'message' => 'Предмет не найден'
        ], Response::HTTP_NOT_FOUND);
    }

    public function delete(Request $request, $subject_id)
    {
        if ($subject = Subject::find($subject_id)) {
            $this->authorize('delete', $subject);
            $subject->delete();

            return response()->json([
                'data' => $subject
            ]);
        }

        return response()->json([
            'message' => 'Предмет не найден'
        ], Response::HTTP_NOT_FOUND);
    }
}
