<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateProjectRequest;
use App\Http\Requests\GetProjectRequest;
use App\Http\Requests\GetProjectsRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use Illuminate\Support\Facades\Auth;

use App\Models\Space;

class ProjectController extends Controller
{
    public function createProject(CreateProjectRequest $request) // Тут надо будет ещё проверку добавить на то, что все указанные id юзеров в массиве имеют право на просмотр проектов
    {
        $space = Space::find($request->space_id);

        $this->authorize('spaceAdmin', $space);

        $project = Project::create($request->all());

        return response()->json($project);
    }

    public function getProjects(GetProjectsRequest $request) // Добавить остальную логику на участника проекта
    {
        if(Space::where([['id', '=', $request->space_id], ['admin_id', '=', Auth::user()->id]])->exists()){
            $projects = Project::where('space_id', $request->space_id)->get();

            if($projects->isEmpty()){
                return response()->json(['message' => 'На данный момент у вас нету проектов']);
            }

            return response()->json($projects);
        }

        //Ну здесь по сути передаем уже space_id в политику

        return response()->json(['message' => 'Ну а тут остальная логика']);
    }

    public function getProject(GetProjectRequest $request) // Тут также добавить остальную логику на участника проекта
    {
        $project = Project::find($request->id);

        if(Space::where([['id', '=', $project->space_id], ['admin_id', '=', Auth::user()->id]])->exists()){ // Выносим в политику
            return response()->json($project);
        }

        // Тут у нас как бы политика в которой проверяется админ или юзер пространства чел, причем чел должен также иметь права на просмотр

        //А дальше после этой проверки мы ищем по его id все записи проектов, то есть ищем записи через массив members, и который в
        // итоге проверяем на пустоту

        return response()->json(['message' => 'Ну а тут остальная логика']);
    }

    public function updateProject(UpdateProjectRequest $request) // Возможно нужно все поля сделать обязательными в запросе, но если че сделаем
    {
        $project = Project::find($request->id);

        $space = Space::find($project->space_id);

        $this->authorize('spaceAdmin', $space);

        $project->update($request->all());

        return response()->json($project);
    }

    public function deleteProject(GetProjectRequest $request)
    {
        $project = Project::find($request->id);

        $space = Space::find($project->space_id);

        $this->authorize('spaceAdmin', $space);

        $project->delete();

        return response()->json(['message' => 'Проект успешно удален']);
    }

}
