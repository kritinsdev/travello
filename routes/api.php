<?php

use App\Http\Controllers\CityController;
use App\Http\Controllers\CuisineController;
use App\Http\Controllers\TypeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PlaceController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('v1')->group(function () {
    Route::get('/places', [PlaceController::class, 'index']);
    Route::post('/places', [PlaceController::class, 'store']);
    Route::get('/places/{id}', [PlaceController::class, 'show']);
    Route::put('/places/{id}', [PlaceController::class, 'update']);
    Route::delete('/places/{id}', [PlaceController::class, 'destroy']);

    Route::get('/cities', [CityController::class, 'index']);

    Route::get('/cuisines', [CuisineController::class, 'index']);

    Route::get('/types', [TypeController::class, 'index']);
});

Route::group(['prefix' => 'admin', 'as' => 'admin.'], function () {
    Route::apiResource('places', App\Http\Controllers\Admin\PlaceController::class);
});