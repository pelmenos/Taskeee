<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateSpaceUserRequest;
use App\Http\Requests\DeleteSpaceUserRequest;

use App\Http\Resources\SpaceUserResource;
use App\Models\Space;
use App\Models\SpaceUser;

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

        $spaceUser = SpaceUser::create($request->validated());

        return response()->json(new SpaceUserResource($spaceUser));
    }

    public function deleteSpaceUser(DeleteSpaceUserRequest $request)
    {
        $space = Space::find($request->id);

        $this->authorize('spaceAdmin', $space);

        $spaceUser = SpaceUser::where('space_id', $request->id)
            ->where('email', $request->email)->first();

        if(!$spaceUser){
            return response()->json(['message' => 'Пользователь не найден в этом пространстве'], 404);
        }

        $spaceUser->delete();

        return response()->json(['message' => 'Пользователь успешно удален из пространства']);
    }
}
