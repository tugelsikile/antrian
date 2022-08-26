<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/
Route::group(['prefix' => 'tamu'], function (){
    Route::any('/poli', [\App\Http\Controllers\PoliController::class, 'tamuPoli']);
    Route::any('/submit-antrian', [\App\Http\Controllers\AntrianController::class, 'submitAntrian']);
    Route::any('/current-antrian', [\App\Http\Controllers\AntrianController::class, 'currentAntrian']);
});
Route::group(['middleware' => 'auth:api'], function (){
    Route::group(['prefix' => 'auth'], function (){
        Route::post('/me', [\App\Http\Controllers\AuthController::class, 'me']);
    });
    Route::group(['prefix' => 'poli'], function (){
        Route::any('/', [\App\Http\Controllers\PoliController::class, 'crud']);
    });
    Route::group(['prefix' => 'dokter'], function (){
        Route::any('/', [\App\Http\Controllers\DokterController::class, 'crud']);
    });
    Route::group(['prefix' => 'antrian'], function (){
        Route::any('/', [\App\Http\Controllers\AntrianController::class, 'crud']);
        Route::any('/call', [\App\Http\Controllers\AntrianController::class, 'call']);
    });
});
