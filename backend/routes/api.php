<?php

use App\Http\Controllers\Api\BoardController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\SpaceRoleController;
use App\Http\Controllers\Api\SpaceUserController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\SpaceController;
use App\Http\Controllers\Api\FinanceProjectController;
use App\Http\Controllers\Api\SubjectController;
use App\Http\Controllers\Api\ConditionController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\StatisticController;
use App\Http\Controllers\Api\BudgetPaymentController;
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
Route::post('verify/code/resend', [UserController::class, 'verifyCodeResend'])->middleware('guestUser');

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request){
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('logout', [UserController::class, 'logout']);
    Route::get('delete/account', [UserController::class, 'deleteUser']);

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

    Route::post('boards', [BoardController::class, 'createBoard']);
    Route::get('boards/{id}', [BoardController::class, 'getBoard']);
    Route::put('boards/{id}', [BoardController::class, 'updateBoard']);
    Route::delete('boards/{id}', [BoardController::class, 'deleteBoard']);

    Route::post('tasks', [TaskController::class, 'createTask']);
    Route::put('tasks/{id}', [TaskController::class, 'updateTask']);
    Route::delete('tasks/{id}', [TaskController::class, 'deleteTask']);

    Route::group([
        'prefix' => 'finances',
        'middleware' => 'finance.access'
    ], function () {
        Route::post('projects', [FinanceProjectController::class, 'store']);
        Route::get('projects', [FinanceProjectController::class, 'index']);
        Route::get('projects/{project_id}', [FinanceProjectController::class, 'view']);
        Route::match(['put', 'patch'], 'projects/{project_id}', [FinanceProjectController::class, 'update']);
        Route::delete('projects/{project_id}', [FinanceProjectController::class, 'delete']);

        Route::post('subjects', [SubjectController::class, 'store']);
        Route::get('subjects', [SubjectController::class, 'index']);
        Route::get('subjects/{subject_id}', [SubjectController::class, 'view']);
        Route::match(['put', 'patch'], 'subjects/{subject_id}', [SubjectController::class, 'update']);
        Route::delete('subjects/{subject_id}', [SubjectController::class, 'delete']);

        Route::post('conditions', [ConditionController::class, 'store']);
        Route::get('conditions', [ConditionController::class, 'index']);
        Route::get('conditions/{condition_id}', [ConditionController::class, 'view']);
        Route::match(['put', 'patch'], 'conditions/{condition_id}', [ConditionController::class, 'update']);
        Route::delete('conditions/{condition_id}', [ConditionController::class, 'delete']);

        Route::post('payments', [PaymentController::class, 'store']);
        Route::get('payments', [PaymentController::class, 'index']);
        Route::get('payments/{payment_id}', [PaymentController::class, 'view']);
        Route::match(['put', 'patch'], 'payments/{payment_id}', [PaymentController::class, 'update']);
        Route::delete('payments/{payment_id}', [PaymentController::class, 'delete']);
        Route::post('payments/{payment_id}', [PaymentController::class, 'duplicate']);
        Route::match(['put', 'patch'], 'payments/{payment_id}/paid', [PaymentController::class, 'paidStatus']);

        Route::post('budget/payments', [BudgetPaymentController::class, 'store']);
        Route::get('budget/payments', [BudgetPaymentController::class, 'index']);
        Route::get('budget/payments/{budget_payment_id}', [BudgetPaymentController::class, 'view']);
        Route::match(['put', 'patch'], 'budget/payments/{budget_payment_id}', [BudgetPaymentController::class, 'update']);
        Route::delete('budget/payments/{budget_payment_id}', [BudgetPaymentController::class, 'delete']);
        Route::post('budget/payments/{budget_payment_id}', [BudgetPaymentController::class, 'duplicate']);
        Route::match(['put', 'patch'], 'budget/payments/{budget_payment_id}/paid', [BudgetPaymentController::class, 'paidStatus']);

        Route::get('statistics/budget/projects', [StatisticController::class, 'projectsBudget']);
        Route::get('statistics/budget/company', [StatisticController::class, 'companyBudget']);
        Route::get('statistics/budget/total', [StatisticController::class, 'totalBudget']);
        Route::get('statistics/budget/expenses', [StatisticController::class, 'totalExpenses']);
        Route::get('statistics/budget/incomes', [StatisticController::class, 'totalIncomes']);
        Route::get('statistics/budget/forecast', [StatisticController::class, 'forecast']);
    });
});
