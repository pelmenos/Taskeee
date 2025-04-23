<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFinanceProjectRequest;
use App\Http\Requests\UpdateFinanceProjectRequest;
use App\Http\Resources\FinanceProjectResource;
use App\Models\FinanceProject;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class FinanceProjectController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('inSpaceEntity', auth()->user());
        $financesProjects = FinanceProject::currentSpace();

        if ($term = $request->q) {
            $financesProjects = $financesProjects->withSearch($term);
        }

        return response()->json([
            'data' => FinanceProjectResource::collection(
                FinanceProject::statusOrder(
                    $financesProjects->get(),
                    ['Ожидание', 'План', 'Заморожено', 'Оплачено']
                )
            )
        ]);
    }

    public function view(Request $request, $projectId)
    {
        if ($project = FinanceProject::find($projectId)) {
            $this->authorize('view', $project);
            return response()->json([
                'data' => FinanceProjectResource::make($project)
            ]);
        }

        return response()->json([
            'message' => 'Проект не найден'
        ], Response::HTTP_NOT_FOUND);
    }

    public function store(StoreFinanceProjectRequest $request)
    {
        $this->authorize('inSpaceEntity', auth()->user());
        $financeProject = FinanceProject::create([
            ...$request->all(),
            'space_id' => auth()->user()->getSpaceId()
        ]);

        return response()->json([
            'data' => FinanceProjectResource::make($financeProject)
        ], Response::HTTP_CREATED);
    }

    public function update(UpdateFinanceProjectRequest $request, $projectId)
    {
        if ($financeProject = FinanceProject::find($projectId)) {
            $this->authorize('update', $financeProject);
            $financeProject->update($request->all());

            return response()->json([
                'data' => FinanceProjectResource::make($financeProject)
            ]);
        }

        return response()->json([
            'message' => 'Проект не найден'
        ], Response::HTTP_NOT_FOUND);
    }

    public function delete(Request $request, $projectId)
    {
        if ($financeProject = FinanceProject::find($projectId)) {
            $this->authorize('delete', $financeProject);
            $financeProject->delete();
            return response()->json([
                'data' => FinanceProjectResource::make($financeProject)
            ]);
        }

        return response()->json([
            'message' => 'Проект не найден'
        ], Response::HTTP_NOT_FOUND);
    }
}
