<?php

use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => 'v1',
    'name' => 'v1.',
], function () {
    Route::group([], base_path('routes/api/v1/authorized/spaces.php'));
});
