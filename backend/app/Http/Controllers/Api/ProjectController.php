<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateProjectRequest;
use App\Http\Requests\GetProjectRequest;
use App\Http\Requests\GetProjectsRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use Illuminate\Support\Facades\Auth;

use App\Models\Space;
use App\Models\Board;
use App\Models\Project;
use App\Models\ProjectSpaceUser;
use App\Models\SpaceUser;

class ProjectController extends Controller
{
    public function createProject(CreateProjectRequest $request)
    {
        $space = Space::find($request->space_id);

        $this->authorize('spaceAdmin', $space);

        $spaceUsers = SpaceUser::whereIn('id', $request->members)->get();

        foreach ($spaceUsers as $spaceUser)
        {
            if($spaceUser->space_id !== $request->space_id){
                return response()->json(['message' => 'Один из пользователей не относится к данному пространству'], 422);
            }

            if($spaceUser->role->permissions['projects_access'] !== true){
                return response()->json(['message' => 'Один из пользователей не имеет прав на доступ к проектам'], 422);
            }
        }

        $project = Project::create([
            'name' => $request->name,
            'description' => $request->description,
            'space_id' => $request->space_id
        ]);

        $project->spaceUsers()->attach($request->input('members'));

        Board::create([
            'name' => $request->boards[0]['name'],
            'description' => $request->boards[0]['description'],
            'project_id' => $project->id
        ]);

        return response()->json(new ProjectResource($project, true, true));
    }

    public function getProjects(GetProjectsRequest $request)
    {
        $spaceAdmin = Space::where([['id', '=', $request->space_id],
            ['admin_id', '=', Auth::user()->id]])->first();

        if($spaceAdmin){
            $projects = $spaceAdmin->projects;

            if($projects->isEmpty()){
                return response()->json(['message' => 'На данный момент у вас нету проектов']);
            }

            return response()->json(ProjectResource::collectionWithFlags($projects, true));
        }

        $spaceMember = Space::find($request->space_id);

        $this->authorize('memberSpaceWithProjectsAccess', $spaceMember);

        $spaceUser = SpaceUser::where('space_id', $request->space_id)
            ->where('email', Auth::user()->email)->first();

        $projects = $spaceUser->projects;

        if($projects->isEmpty()){
            return response()->json(['message' => 'На данный момент у вас нету проектов']);
        }

        return response()->json(ProjectResource::collectionWithFlags($projects, true));
    }

    public function getProject(GetProjectRequest $request)
    {
        $project = Project::find($request->id);

        $this->authorize('adminOrMemberSpaceWithProjectsAccess', $project);

        return response()->json(new ProjectResource($project, true, true, true));
    }

    public function updateProject(UpdateProjectRequest $request)
    {
        $project = Project::find($request->id);

        $this->authorize('spaceAdmin', $project->space);

        $spaceUsers = SpaceUser::whereIn('id', $request->members)->get();

        foreach ($spaceUsers as $spaceUser)
        {
            if($spaceUser->space_id !== $project->space->id){
                return response()->json(['message' => 'Один из пользователей не относится к данному пространству'], 422);
            }

            if($spaceUser->role->permissions['projects_access'] !== true){
                return response()->json(['message' => 'Один из пользователей не имеет прав на доступ к проектам'], 422);
            }

            if(ProjectSpaceUser::where('project_id', $request->id)->where('space_user_id', $spaceUser->id)->exists()){
                return response()->json(['message' => 'Один из пользователей уже является участником данного проекта'], 422);
            }
        }

        $project->update([
            'name' => $request->name,
            'description' => $request->description
        ]);

        $project->spaceUsers()->attach($request->input('members'));

        foreach ($request->boards as $board){
            Board::create([
                'name' => $board['name'],
                'description' => $board['description'],
                'project_id' => $project->id
            ]);
        }

        return response()->json(new ProjectResource($project, true, true));
    }

    public function deleteProject(GetProjectRequest $request)
    {
        $project = Project::find($request->id);

        $this->authorize('spaceAdmin', $project->space);

        $project->delete();

        return response()->json(['message' => 'Проект успешно удален']);
    }
}
