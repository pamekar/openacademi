<?php

use Illuminate\Support\Facades\Route;

Route::group(['namespace' => 'Api'], function () {
    Route::post('login', 'AuthController@login');
    Route::group(['middleware' => 'jwt.auth'], function ($router) {
        Route::group(['prefix' => 'auth'], function () {
            Route::post('logout', 'AuthController@logout');
            Route::post('refresh', 'AuthController@refresh');
            Route::post('me', 'AuthController@me');
        });
        Route::get('dashboard','HomeController@index');
    });
});
