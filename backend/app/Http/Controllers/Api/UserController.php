<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthorizationRequest;
use App\Http\Requests\PasswordResetEmailRequest;
use App\Http\Requests\PasswordResetRequest;
use App\Http\Requests\PasswordResetVerifyRequest;
use App\Http\Requests\RegistrationRequest;
use App\Http\Requests\VerifyRegistrationRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Wotz\VerificationCode\VerificationCode;

use App\Models\User;
use Wotz\VerificationCode\Models\VerificationCode as VerifyModel;

class UserController extends Controller
{
    public function registration(RegistrationRequest $request)
    {
        VerificationCode::send($request->email);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['message' => 'Пользователь прошел базовую регистрацию', 'email' => $user->email]);
    }

    public function verifyRegistration(VerifyRegistrationRequest $request)
    {
        $user = User::where('email', $request->email)->first();

        if(VerificationCode::verify($request->verify_code, $request->email)){
            $user->markEmailAsVerified();

            return response()->json(['message' => 'Пользователь подтвердил свой аккаунт']);
        }

        return response()->json(['message' => 'Введенный код не относится ни к одному из пользователей'], 422);
    }

    public function authorization(AuthorizationRequest $request)
    {
        if(!Auth::attempt($request->only(['email', 'password']))){
            return response()->json(['message' => 'Введенные данные не относятся к существующему аккаунту'], 422);
        }

        $user = Auth::user();

        if($request->input('remember_me') === 'true') {
            $token = $user->createToken('token', ['*'], now()->addDays(7))->plainTextToken;
        }
        else{
            $token = $user->createToken('token', ['*'], now()->addDays(1))->plainTextToken;
        }

        return response()->json(['message' => 'Пользователь успешно авторизирован', 'token' => $token]);
    }

    public function passwordResetEmail(PasswordResetEmailRequest $request)
    {
        $user = User::where('email', $request->email)->first();

        VerificationCode::send($user->email);

        return response()->json(['message' => 'Код для восстановления пароля был отправлен на почту', 'email' => $user->email]);
    }

    public function passwordResetVerify(PasswordResetVerifyRequest $request)
    {
        $user = User::where('email', $request->email)->first();

        if(VerificationCode::verify($request->verify_code, $request->email, false)){
            return response()->json(['message' => 'Введенный код для восстановления пароля подтвержден',
                'email' => $user->email, 'verify_code' => $request->verify_code]);
        }

        return response()->json(['message' => 'Введенный код не относится ни к одному из пользователей'], 422);
    }

    public function passwordReset(PasswordResetRequest $request)
    {
        $user = User::where('email', $request->email)->first();

        if(VerificationCode::verify($request->verify_code, $request->email)){
            $user->update([
                'password' => Hash::make($request->password)
            ]);

            return response()->json(['message' => 'Пароль был успешно изменен']);
        }

        return response()->json(['message' => 'Использованный код не относится ни к одному из пользователей'], 422);
    }

    public function verifyCodeResend(PasswordResetEmailRequest $request)
    {
        VerifyModel::where([['verifiable', '=', $request->email],
            ['expires_at', '<=', now()]])->delete();

        $codes = VerifyModel::where('verifiable', $request->email)->get();

        if($codes->isEmpty())
        {
            return response()->json(['message' => 'Ранее запрошенных кодов нету'], 422);
        }

        foreach($codes as $code)
        {
            $code->delete();
        }

        VerificationCode::send($request->email);

        return response()->json(['message' => 'Повторный код был отправлен на почту',
            'email' => $request->email]); // мб почту убрать надо
    }

    public function logout()
    {
        Auth::user()->tokens()->delete();

        return response()->json(['message' => 'Пользователь вышел из аккаунта']);
    }

    public function deleteUser()
    {
        $user = Auth::user();

        $user->inviteTokens()->delete();

        foreach($user->spaces as $space)
        {
            $space->delete();
        }

        Auth::user()->tokens()->delete();

        $user->delete();

        return response()->json(['message' => 'Аккаунт удален']);
    }
}
