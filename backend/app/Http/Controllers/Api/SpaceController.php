<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AcceptInviteSpaceRequest;
use App\Http\Requests\CreateSpaceRequest;
use App\Http\Requests\DeleteSpaceRequest;
use App\Http\Requests\GetSpaceRequest;
use App\Http\Requests\SendInviteSpaceRequest;
use App\Http\Requests\UpdateSpaceRequest;
use App\Http\Requests\UpdateUserSpaceRoleRequest;
use App\Http\Resources\SpaceResource;
use App\Models\SpaceRole;
use App\Notifications\InviteToSpace;
use Illuminate\Support\Facades\Auth;

use App\Models\Space;
use App\Models\User;
use App\Models\SpaceUser;
use App\Models\InviteToken;

class SpaceController extends Controller
{
    public function createSpace(CreateSpaceRequest $request)
    {
        if(Space::where([['admin_id', '=', $request->admin_id], ['name', '=', $request->name]])->exists()){
            return response()->json(['message' => 'Ошибка при создании пространства',
                'errors' => ['name' => ['Пользователь уже имеет данное пространство']]], 422);
        }

        $space = Space::create($request->validated());

        return response()->json(new SpaceResource($space, true, true));
    }

    public function getSpaces()
    {
        $adminSpaces = Space::where('admin_id', Auth::user()->id)->get();

        $memberSpaces = Space::whereIn('id', SpaceUser::where('email',
            Auth::user()->email)->pluck('space_id'))->get();

        $allSpaces = $adminSpaces->merge($memberSpaces);

        if($allSpaces->isEmpty()){
            return response()->json(['message' =>
                'На данный момент вы не владеете и не являетесь участником какого-либо пространства']);
        }

        return response()->json(SpaceResource::collectionWithFlags($allSpaces, true));
    }

    public function getSpace(GetSpaceRequest $request)
    {
        $space = Space::find($request->id);

        $this->authorize('adminOrMemberSpace', $space);

        return response()->json(new SpaceResource($space, true, true, true, true));
    }

    public function updateSpace(UpdateSpaceRequest $request)
    {
        $space = Space::find($request->id);

        $this->authorize('spaceAdmin', $space);

        if(Space::where([['admin_id', '=', Auth::user()->id], ['name', '=', $request->name]])
            ->where('id', '!=', $space->id)->exists()){
            return response()->json(['message' => 'Ошибка при обновлении пространства',
                'errors' => ['name' => ['Пользователь уже имеет данное пространство']]], 422);
        }

        $space->update($request->validated());

        return response()->json(new SpaceResource($space, true, true));
    }

    public function deleteSpace(DeleteSpaceRequest $request)
    {
        $space = Space::find($request->id);

        $this->authorize('spaceAdmin', $space);

        $space->inviteTokens()->delete();

        $space->delete();

        return response()->json(['message' => 'Пространство успешно удалено']);
    }

    public function sendInviteSpace(SendInviteSpaceRequest $request)
    {
        $space = Space::find($request->id);

        $this->authorize('spaceAdmin', $space); // Тут возможно не только админ будет отправлять приглосы

        if(SpaceUser::where([['space_id', '=', $request->id],['email', '=', $request->email]])->exists()){
            return response()->json(['message' => 'Ошибка при отправлении приглашения',
                'errors' => ['email' => ['Пользователь уже является участником данного пространства']]], 422);
        }

        $spaceRole = SpaceRole::where([['space_id', '=', $request->id],
            ['name', '=', $request->role]])->first();

        if(!$spaceRole){
            return response()->json(['message' => 'Ошибка при отправлении приглашения',
                'errors' => ['role' => ['Указанная роль не относится к данному пространству']]], 422);
        }

        $user = User::where('email', $request->email)->first();

        $user->notify(new InviteToSpace($space, Auth::user()->id, $spaceRole->id));

        return response()->json(['message' => 'Приглашение успешно отправлено']);
    }

    public function acceptInviteSpace(AcceptInviteSpaceRequest $request)
    {
        $token = InviteToken::where('token', $request->token)->first();

        if($token->sender_id === Auth::user()->id){
            return response()->json(['message' => 'Ошибка при принятии приглашения',
                'errors' => ['token' => ['Вы не можете принять приглашение, которое сами отправили']]], 422);
        }

        if(SpaceUser::where([['space_id', '=', $token->space_id],['email', '=', Auth::user()->email]])->exists()){
            return response()->json(['message' => 'Ошибка при принятии приглашения',
                'errors' => ['token' => ['Вы уже являетесь участником данного пространства']]], 422);
        }

        if($token->expires_at <= now()->format('Y-m-d H:i:s')){
            $token->delete();

            return response()->json(['message' => 'Ошибка при принятии приглашения',
                'errors' => ['token' => ['Срок действия токена приглашения истек']]], 422);
        }

        SpaceUser::create([
            'space_id' => $token->space_id,
            'email' => Auth::user()->email,
            'role_id' => $token->role_id,
        ]);

        $token->delete();

        return response()->json(['message' => 'Приглашение принято']);
    }

    public function updateUserSpaceRole(UpdateUserSpaceRoleRequest $request)
    {
        $space = Space::find($request->id);

        $this->authorize('spaceAdmin', $space);

        $spaceUser = SpaceUser::find($request->user_id);

        if($spaceUser->space_id !== $request->id){
            return response()->json(['message' => 'Ошибка при обновлении роли пользователя пространства',
                'errors' => ['user_id' => ['Пользователь не относится к указанному пространству']]], 422);
        }

        $spaceRole = SpaceRole::where([['space_id', '=', $request->id],
            ['name', '=', $request->role]])->first();

        if(!$spaceRole){
            return response()->json(['message' => 'Ошибка при обновлении роли пользователя пространства',
                'errors' => ['role' => ['Указанная роль не относится к данному пространству']]], 422);
        }

        $spaceUser->update([
            'role_id' => $spaceRole->id
        ]);

        return response()->json(['message' => 'Роль пользователя успешно обновлена']);
    }
}
