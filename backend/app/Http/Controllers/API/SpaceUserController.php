<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateSpaceUserRequest;
use App\Http\Requests\DeleteSpaceUserRequest;
use App\Http\Resources\SpaceUserResource;
use App\Models\Space;
use App\Models\Space\SpaceRole;
use App\Models\Space\SpaceUser;

class SpaceUserController extends Controller
{
    public function createSpaceUser(CreateSpaceUserRequest $request)
    {
        $space = Space::find($request->space_id);

        $this->authorize('spaceAdmin', $space);

        if(SpaceUser::where([['space_id', '=', $request->space_id], ['email', '=', $request->email]])->exists()){
            return response()->json(['message' => 'Ошибка при создании пользователя пространства',
                'errors' => ['email' => ['Пользователь уже находится в пространстве']]], 422);
        }

        $spaceRole = SpaceRole::find($request->role_id);

        if($spaceRole->space_id !== $space->id){
            return response()->json(['message' => 'Ошибка при создании пользователя пространства',
                'errors' => ['role_id' => ['Указанная роль не относится к данному пространству']]], 422);
        }

        $spaceUser = SpaceUser::create($request->validated());

        return response()->json(new SpaceUserResource($spaceUser));
    }

    public function deleteSpaceUser(DeleteSpaceUserRequest $request)
    {
        $spaceUser = SpaceUser::find($request->space_user_id);

        $this->authorize('spaceAdmin', $spaceUser->space);

        $spaceUser->delete();

        return response()->json(['message' => 'Пользователь успешно удален из пространства']);
    }
}
