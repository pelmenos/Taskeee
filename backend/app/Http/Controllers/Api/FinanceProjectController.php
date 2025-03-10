<?php

namespace App\Http\Controllers\Api;

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
        $financeProject = FinanceProject::create([
            'comment' => $request->input('comment'),
            'price' => $request->input('price'),
            'status_id' => $request->input('status_id'),
            'project_id' => $request->input('project_id'),
            'coordinator_id' => $request->input('coordinator_id'),
            'lead_id' => $request->input('lead_id'),
            'customer_id' => $request->input('customer_id'),
            'source_id' => $request->input('source_id'),
            'space_id' => auth()->user()->getSpaceId()
        ]);

        return response()->json([
            'data' => FinanceProjectResource::make($financeProject)
        ], Response::HTTP_CREATED);
    }

    public function update(UpdateFinanceProjectRequest $request, $projectId)
    {
        if ($financeProject = FinanceProject::find($projectId)) {

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
