<?php

use Illuminate\Support\Facades\Route;

Route::group(['namespace' => 'Student','middleware'=>'jwt.auth'], function () {
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
Route::group(['namespace' => 'Instructor','middleware'=>'jwt.auth'], function () {

});