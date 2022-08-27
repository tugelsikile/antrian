<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () { return view('welcome'); });
Route::get('/login', function (){ return view('auth.login'); })->name('login');
Route::post('/auth/login', [\App\Http\Controllers\AuthController::class, 'login']);
Route::group(['middleware' => 'auth'], function (){
    Route::any('/logout', [\App\Http\Controllers\AuthController::class,'logout']);
    Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class,'index']);
    Route::get('/poli', function (){ return view('poli'); });
    Route::get('/dokter', function (){ return view('dokter'); });
    Route::get('/antrian', function (){ return view('antrian'); });
    Route::group(['prefix' => 'setting'], function (){
        Route::get('/aplikasi', function (){ return view('setting.aplikasi'); });
        Route::get('/printer', function (){ return view('setting.printer'); });
    });
});
Route::group(['prefix' => 'tamu'], function (){
    Route::group(['prefix' => 'antrian'], function (){
        Route::get('/', function (){ return view('tamu.antrian.screen'); });
        Route::get('/input', function (){ return view('tamu.antrian.input'); });
    });
});
