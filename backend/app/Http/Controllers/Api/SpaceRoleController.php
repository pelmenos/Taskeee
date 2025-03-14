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
        $space = Space::find($request->space_id);

        $this->authorize('spaceAdmin', $space);

        if(SpaceRole::where([['space_id', '=', $request->space_id], ['name', '=', $request->name]])->exists()){
            return response()->json(['message' => 'Пространство уже содержит такую роль'], 422);
        }

        $spaceRole = SpaceRole::create($request->validated());

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

        $spaceRole->update($request->validated());

        return response()->json(['message' => 'Роль успешно обновлена']);
    }

    public function deleteSpaceRole(DeleteSpaceRoleRequest $request)
    {
        $space = Space::find($request->id);

        $this->authorize('spaceAdmin', $space);

        $spaceRole = SpaceRole::where([['space_id', '=', $request->id],
            ['id', '=', $request->role_id]])->first();

        if(!$spaceRole){
            return response()->json(['message' => 'Роль не относится к этому пространству'], 403);
        }

        $spaceRole->delete();

        return response()->json(['message' => 'Роль успешно удалена']);
    }

}
