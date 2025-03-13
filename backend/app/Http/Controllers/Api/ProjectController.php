<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateProjectRequest;
use App\Http\Requests\GetProjectRequest;
use App\Http\Requests\GetProjectsRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use App\Models\ProjectSpaceUser;
use App\Models\SpaceRole;
use App\Models\SpaceUser;
use Illuminate\Support\Facades\Auth;

use App\Models\Space;

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

            $spaceRole = SpaceRole::find($spaceUser->role_id);

            if($spaceRole->permissions['projects_access'] !== true){
                return response()->json(['message' => 'Один из пользователей не имеет прав на доступ к проектам'], 422);
            }
        }

        $project = Project::create([
            'name' => $request->name,
            'description' => $request->description,
            'space_id' => $request->space_id,
            'boards' => $request->boards,
        ]);

        $project->spaceUsers()->attach($request->input('members'));

        $project['members'] = $request->input('members');

        return response()->json($project);
    }

    public function getProjects(GetProjectsRequest $request)
    {
        $spaceAdmin = Space::where([['id', '=', $request->space_id], ['admin_id', '=', Auth::user()->id]])->first();

        if($spaceAdmin){
            $projects = Project::where('space_id', $request->space_id)->get();

            if($projects->isEmpty()){
                return response()->json(['message' => 'На данный момент у вас нету проектов']);
            }

            foreach ($projects as $project){
                $project['members'] = $project->spaceUsers->pluck('id');
            }

            return response()->json($projects);
        }

        $spaceMember = Space::where('id', $request->space_id)->first();

        $this->authorize('memberSpaceWithProjectsAccess', $spaceMember);

        $spaceUser = SpaceUser::where('space_id', $request->space_id)
            ->where('email', Auth::user()->email)->first();

        $projects = $spaceUser->projects()->get();

        if($projects->isEmpty()){
            return response()->json(['message' => 'На данный момент у вас нету проектов']);
        }

        foreach ($projects as $project){
            $project['members'] = $project->spaceUsers->pluck('id');
        }

        return response()->json($projects); // Нужно будет поле pivot убрать, скорее всего через ресурсы
    }

    public function getProject(GetProjectRequest $request)
    {
        $project = Project::find($request->id);

        $this->authorize('adminOrMemberSpaceWithProjectsAccess', $project);

        $project['members'] = $project->spaceUsers->pluck('id');

        return response()->json($project);
    }

    public function updateProject(UpdateProjectRequest $request)
    {
        $project = Project::find($request->id);

        $space = Space::find($project->space_id);

        $this->authorize('spaceAdmin', $space);

        $spaceUsers = SpaceUser::whereIn('id', $request->members)->get();

        foreach ($spaceUsers as $spaceUser)
        {
            if($spaceUser->space_id !== $request->space_id){
                return response()->json(['message' => 'Один из пользователей не относится к данному пространству'], 422);
            }

            $spaceRole = SpaceRole::find($spaceUser->role_id);

            if($spaceRole->permissions['projects_access'] !== true){
                return response()->json(['message' => 'Один из пользователей не имеет прав на доступ к проектам'], 422);
            }
        }

        $project->update([
            'name' => $request->name,
            'description' => $request->description,
            'boards' => $request->boards,
        ]);

        $project->spaceUsers()->sync($request->input('members'));

        $project['members'] = $request->input('members');

        return response()->json($project);
    }

    public function deleteProject(GetProjectRequest $request)
    {
        $project = Project::find($request->id);

        $space = Space::find($project->space_id);

        $this->authorize('spaceAdmin', $space);

        ProjectSpaceUser::where('project_id', $project->id)->delete();

        $project->delete();

        return response()->json(['message' => 'Проект успешно удален']);
    }

}
