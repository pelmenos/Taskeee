<?php

use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\SpaceRoleController;
use App\Http\Controllers\Api\SpaceUserController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\SpaceController;
use App\Http\Controllers\Api\FinanceProjectController;
use App\Http\Controllers\Api\SubjectController;
use App\Http\Controllers\Api\ConditionController;
use App\Http\Controllers\Api\PaymentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('registration', [UserController::class, 'registration'])->middleware('guestUser');
Route::post('registration/verify', [UserController::class, 'verifyRegistration'])->middleware('guestUser');
Route::post('authorization', [UserController::class, 'authorization'])->middleware('guestUser');
Route::post('password/reset/email', [UserController::class, 'passwordResetEmail'])->middleware('guestUser');
Route::post('password/reset/verify', [UserController::class, 'passwordResetVerify'])->middleware('guestUser');
Route::post('password/reset', [UserController::class, 'passwordReset'])->middleware('guestUser');
Route::post('verify/code/resend', [UserController::class, 'verifyCodeResend']);

Route::post('file', function(Request $request){
    $file = $request->file('file');

    // Сохраняем файл в хранилище (storage/app/public)
    $path = $file->store('uploads', 'public');

    // Возвращаем путь к сохраненному файлу
    return response()->json([
        'message' => 'File uploaded successfully!',
        'path' => Storage::disk('public')->url($path)
    ], 200);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('spaces/{id}/roles', [SpaceRoleController::class, 'createSpaceRole']);
    Route::put('spaces/{id}/roles/{role_id}', [SpaceRoleController::class, 'updateSpaceRole']);
    Route::delete('spaces/{id}/roles/{role_id}', [SpaceRoleController::class, 'deleteSpaceRole']);

    Route::post('spaces/{id}/users', [SpaceUserController::class, 'createSpaceUser']);
    Route::delete('spaces/{id}/users/{email}', [SpaceUserController::class, 'deleteSpaceUser']);

    Route::post('spaces', [SpaceController::class, 'createSpace']);
    Route::get('spaces', [SpaceController::class, 'getSpaces']);
    Route::get('spaces/{id}', [SpaceController::class, 'getSpace']);
    Route::put('spaces/{id}', [SpaceController::class, 'updateSpace']);
    Route::delete('spaces/{id}', [SpaceController::class, 'deleteSpace']);
    Route::post('spaces/{id}/invite', [SpaceController::class, 'sendInviteSpace']);
    Route::get('invite/{token}', [SpaceController::class, 'acceptInviteSpace']);
    Route::put('spaces/{id}/users/{user_id}/role', [SpaceController::class, 'updateUserSpaceRole']);

    Route::post('projects', [ProjectController::class, 'createProject']);
    Route::get('projects', [ProjectController::class, 'getProjects']);
    Route::get('projects/{id}', [ProjectController::class, 'getProject']);
    Route::put('projects/{id}', [ProjectController::class, 'updateProject']);
    Route::delete('projects/{id}', [ProjectController::class, 'deleteProject']);

    Route::group([
        'prefix' => 'finances'
    ], function () {
        Route::post('projects', [FinanceProjectController::class, 'store']);
        Route::get('projects', [FinanceProjectController::class, 'index']);
        Route::get('projects/{project_id}', [FinanceProjectController::class, 'view']);
        Route::match(['put', 'patch'], 'projects/{project_id}', [FinanceProjectController::class, 'update']);
        Route::delete('projects/{project_id}', [FinanceProjectController::class, 'delete']);
    });

    Route::group([
        'prefix' => 'finances'
    ], function () {
        Route::post('subjects', [SubjectController::class, 'store']);
        Route::get('subjects', [SubjectController::class, 'index']);
        Route::get('subjects/{subject_id}', [SubjectController::class, 'view']);
        Route::match(['put', 'patch'], 'subjects/{subject_id}', [SubjectController::class, 'update']);
        Route::delete('subjects/{subject_id}', [SubjectController::class, 'delete']);
    });

    Route::group([
        'prefix' => 'finances'
    ], function () {
        Route::post('conditions', [ConditionController::class, 'store']);
        Route::get('conditions', [ConditionController::class, 'index']);
        Route::get('conditions/{condition_id}', [ConditionController::class, 'view']);
        Route::match(['put', 'patch'], 'conditions/{condition_id}', [ConditionController::class, 'update']);
        Route::delete('conditions/{condition_id}', [ConditionController::class, 'delete']);
    });

    Route::group([
        'prefix' => 'finances'
    ], function () {
        Route::post('payments', [PaymentController::class, 'store']);
        Route::get('payments', [PaymentController::class, 'index']);
        Route::get('payments/{payment_id}', [PaymentController::class, 'view']);
        Route::match(['put', 'patch'], 'payments/{payment_id}', [PaymentController::class, 'update']);
        Route::delete('payments/{payment_id}', [PaymentController::class, 'delete']);
        Route::post('payments/{payment_id}', [PaymentController::class, 'duplicate']);
        Route::match(['put', 'patch'], 'payments/{payment_id}/paid', [PaymentController::class, 'paidStatus']);
    });
});
