<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateSpaceUserRequest;
use App\Http\Requests\DeleteSpaceUserRequest;

use App\Models\Space;
use App\Models\SpaceUser;

class SpaceUserController extends Controller
{
    public function createSpaceUser(CreateSpaceUserRequest $request)
    {
        $space = Space::find($request->id);

        $this->authorize('spaceAdmin', $space);

        if(SpaceUser::where([['space_id', '=', $request->id], ['email', '=', $request->email]])->exists()){
            return response()->json(['message' => 'Пользователь уже находится в пространстве'], 422);
        }

        $request->merge(['space_id' => $request->id]);

        SpaceUser::create($request->all());

        return response()->json(['message' => 'Пользователь приглашен успешно']);
    }

    public function deleteSpaceUser(DeleteSpaceUserRequest $request)
    {
        $space = Space::find($request->id);

        $this->authorize('spaceAdmin', $space);

        $spaceUser = SpaceUser::where('space_id', $request->id)
            ->where('email', $request->email)->first();

        if(!$spaceUser){
            return response()->json(['message' => 'Пользователь не найден'], 404);
        }

        $spaceUser->delete();

        return response()->json(['message' => 'Пользователь успешно удален']);
    }

}
