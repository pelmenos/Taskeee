<?php

use App\Http\Controllers\API\V1\SpaceController;
use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => 'spaces',
    'name' => 'spaces',
], function () {
    Route::get('', [SpaceController::class, 'list'])
        ->name('list');
    Route::post('', [SpaceController::class, 'create'])
        ->name('create');

    Route::group([
        'prefix' => '{modelId}',
    ], function () {
        Route::get('', [SpaceController::class, 'item'])
            ->name('item');
        Route::post('', [SpaceController::class, 'update'])
            ->name('update');
        Route::delete('', [SpaceController::class, 'delete'])
            ->name('delete');
    })->whereUuid('modelId');
});
