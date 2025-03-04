<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AcceptInviteSpaceRequest;
use App\Http\Requests\CreateSpaceRequest;
use App\Http\Requests\GetSpaceRequest;
use App\Http\Requests\SendInviteSpaceRequest;
use App\Http\Requests\UpdateSpaceRequest;
use App\Models\InviteToken;
use App\Notifications\InviteToSpace;
use Illuminate\Support\Facades\Auth;

use App\Models\Space;
use App\Models\User;

class SpaceController extends Controller
{
    public function createSpace(CreateSpaceRequest $request)
    {
        if(Space::where([['admin_id', '=', $request->admin_id], ['name', '=', $request->name]])->exists()){
            return response()->json(['message' => 'Пользователь уже имеет данное пространство'], 422);
        }

        $space = Space::create($request->all());

        return response()->json($space);
    }

    public function getSpaces() // Надо тут будет добавить логику нахождения спейсов для юзера как участника, и выводить все пространства где он есть
    {
        $spaces = Space::where('admin_id', Auth::user()->id)->get();

        if($spaces->isEmpty()){
            return response()->json(['message' => 'На данный момент вы не владеете каким-либо пространством']);
        }

        return response()->json($spaces);
    }

    public function getSpace(GetSpaceRequest $request) // Надо тут будет добавить проверку что юзер также является участником спейса, и мб засунуть ее в реквест
    {
        $space = Space::find($request->id);

        if(!$space->admin_id === Auth::user()->id){ // Скорее всего в политику перенесем, и вообще все что связано с проверкой доступа лучше в политику кидать
            return response()->json(['message' => 'Пользователь не является администратором данного пространства'], 403);
        }

        return response()->json($space);
    }

    public function updateSpace(UpdateSpaceRequest $request) // Возможно нужно все поля сделать обязательными в запросе, но если че сделаем
    {
        $space = Space::find($request->id);

        $this->authorize('spaceAdmin', $space);

        if(Space::where([['admin_id', '=', Auth::user()->id], ['name', '=', $request->name]])
            ->where('id', '!=', $space->id)->exists()){
            return response()->json(['message' => 'Пользователь уже имеет данное пространство'], 422);
        }

        $space->update([
            'name' => $request->name,
            'description' => $request->description ?? $space->description,
            'avatar' =>$request->avatar ?? $space->avatar,
            'tariff' => $request->tariff ?? $space->tariff,
        ]); // все поля обязательными сделать надо будет

        return response()->json($space);
    }

    public function deleteSpace(GetSpaceRequest $request)
    {
        $space = Space::find($request->id);

        $this->authorize('spaceAdmin', $space);

        $space->delete();

        return response()->json(['message' => 'Пространство успешно удалено']);
    }

    public function sendInviteSpace(SendInviteSpaceRequest $request) // Проверить в реквесте или тут, что чел есть в табличке юзеров спейса из 1.4, то есть если есть то выводить ошибку
    {
        $space = Space::find($request->id);

        $this->authorize('spaceAdmin', $space); // Тут возможно не только админ будет отправлять приглосы

        // Скорее всего именно тут эта проверка будет

        $user = User::where('email', $request->email)->first();

        $user->notify(new InviteToSpace($space, Auth::user()->id));

        return response()->json(['message' => 'Приглашение успешно отправлено']);
    }

    public function acceptInviteSpace(AcceptInviteSpaceRequest $request) // Тут также проверка на то, что юзера нету в таблице юзеров спейса из 1.4
    {
        $token = InviteToken::where('token', $request->token)->first();

        if($token->sender_id === Auth::user()->id){
            return response()->json(['message' => 'Вы не можете принять приглашение, которое сами отправили'], 422);
        }

        // Скорее всего именно тут эта проверка будет

        if($token->expires_at <= now()->format('Y-m-d H:i:s')){
            $token->delete();

            return response()->json(['message' => 'Срок действия ссылки на приглашение истек'], 422);
        }

        $token->delete();

        return response()->json(['message' => 'Приглашение принято']);
    }

}
