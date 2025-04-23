<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateSpaceRoleRequest;
use App\Http\Requests\DeleteSpaceRoleRequest;
use App\Http\Requests\UpdateSpaceRoleRequest;
use App\Http\Resources\SpaceRoleResource;
use App\Models\Space;
use App\Models\Space\SpaceRole;

class SpaceRoleController extends Controller
{
    public function createSpaceRole(CreateSpaceRoleRequest $request)
    {
        $space = Space::find($request->space_id);

        $this->authorize('spaceAdmin', $space);

        if(SpaceRole::where([['space_id', '=', $request->space_id], ['name', '=', $request->name]])->exists()){
            return response()->json(['message' => 'Ошибка при создании роли пространства',
                'errors' => ['name' => ['Пространство уже содержит такую роль']]], 422);
        }

        $spaceRole = SpaceRole::create($request->validated());

        return response()->json(new SpaceRoleResource($spaceRole));
    }

    public function updateSpaceRole(UpdateSpaceRoleRequest $request)
    {
        $spaceRole = SpaceRole::find($request->role_id);

        $this->authorize('spaceAdmin', $spaceRole->space);

        if(SpaceRole::where([['space_id', '=', $spaceRole->space->id], ['name', '=', $request->name]])
            ->where('id', '!=', $request->role_id)->exists()){
            return response()->json(['message' => 'Ошибка при обновлении роли пространства',
                'errors' => ['name' => ['Пространство уже содержит такую роль']]], 422);
        }

        $spaceRole->update($request->validated());

        return response()->json(new SpaceRoleResource($spaceRole));
    }

    public function deleteSpaceRole(DeleteSpaceRoleRequest $request)
    {
        $spaceRole = SpaceRole::find($request->role_id);

        $this->authorize('spaceAdmin', $spaceRole->space);

        $spaceRole->inviteTokens()->delete();

        $spaceRole->delete();

        return response()->json(['message' => 'Роль успешно удалена']);
    }

}
