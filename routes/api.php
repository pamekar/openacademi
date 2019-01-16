<?php

use Illuminate\Support\Facades\Route;

Route::group(['namespace' => 'Api'], function () {
    Route::post('login', 'AuthController@login');
    /*Route::group(['prefix' => 'auth'], function () {
        Route::post('logout', 'AuthController@logout');
        Route::post('refresh', 'AuthController@refresh');
        Route::get('me', 'AuthController@me');

    });*/

    Route::group(['middleware' => 'jwt.auth'], function ($router) {
        Route::get('courses/purchased', 'CoursesController@getPurchased');
        Route::get('courses/categories/{slug}', 'CoursesController@getCategories');
        Route::get('courses/categories', 'CoursesController@listCategories');
        Route::get('courses/all', 'CoursesController@getAll');
    });
});
