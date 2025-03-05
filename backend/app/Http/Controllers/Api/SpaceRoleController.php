<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateSpaceRoleRequest;
use App\Http\Requests\DeleteSpaceRoleRequest;
use App\Http\Requests\UpdateSpaceRoleRequest;
use App\Http\Resources\SpaceRoleResource;
use App\Models\SpaceRole;

use App\Models\Space;

class SpaceRoleController extends Controller
{
    public function createSpaceRole(CreateSpaceRoleRequest $request)
    {
        $space = Space::find($request->id);

        $this->authorize('spaceAdmin', $space);

        if(SpaceRole::where([['space_id', '=', $request->id], ['name', '=', $request->name]])->exists()){
            return response()->json(['message' => 'Пространство уже содержит такую роль'], 422);
        }

        $request->merge(['space_id' => $request->id]);

        $spaceRole = SpaceRole::create($request->all());

        return response()->json(new SpaceRoleResource($spaceRole, true));
    }

    public function updateSpaceRole(UpdateSpaceRoleRequest $request)
    {
        $space = Space::find($request->id);

        $this->authorize('spaceAdmin', $space);

        if(SpaceRole::where([['space_id', '=', $request->id], ['name', '=', $request->name]])
            ->where('id', '!=', $request->role_id)->exists()){
            return response()->json(['message' => 'Пространство уже содержит такую роль'], 422);
        }

        $spaceRole = SpaceRole::find($request->role_id);

        $spaceRole->update($request->all());

        return response()->json(['message' => 'Роль успешно обновлена']);
    }

    public function deleteSpaceRole(DeleteSpaceRoleRequest $request)
    {
        $space = Space::find($request->id);

        $this->authorize('spaceAdmin', $space);

        $spaceRole = SpaceRole::find($request->role_id);

        $spaceRole->delete();

        return response()->json(['message' => 'Роль успешно удалена']);
    }

}
