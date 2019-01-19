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
        Route::get('course/{slug}', 'CoursesController@getCourse');
        Route::get('courses/purchased',
            'CoursesController@getPurchasedCourses');
        Route::get('courses/categories/{slug}',
            'CoursesController@getCategoryCourses');
        Route::get('courses/tags/{tag}', 'CoursesController@getTagCourses');
        Route::get('courses/categories', 'CoursesController@getCategories');
        Route::get('courses/all', 'CoursesController@getAllCourses');
        Route::get('lesson/{id}/{slug}', 'LessonsController@show');
    });
});
