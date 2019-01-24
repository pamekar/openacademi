<?php

use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'checkLoggedIn'], function () {
    Route::group(['namespace' => 'Student', 'middleware' => 'jwt.auth'],
        function () {
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
    Route::group(['namespace' => 'Instructor', 'middleware' => 'jwt.auth'],
        function () {
            Route::get('/', 'Instructor\DashboardController@index');
            Route::resource('permissions', 'Instructor\PermissionsController');
            Route::post('permissions_mass_destroy', [
                'uses' => 'Instructor\PermissionsController@massDestroy',
                'as'   => 'permissions.mass_destroy'
            ]);
            Route::resource('roles', 'Instructor\RolesController');
            Route::post('roles_mass_destroy', [
                'uses' => 'Instructor\RolesController@massDestroy',
                'as'   => 'roles.mass_destroy'
            ]);
            Route::resource('users', 'Instructor\UsersController');
            Route::post('users_mass_destroy', [
                'uses' => 'Instructor\UsersController@massDestroy',
                'as'   => 'users.mass_destroy'
            ]);
            Route::resource('courses', 'Instructor\CoursesController');
            Route::post('courses_mass_destroy', [
                'uses' => 'Instructor\CoursesController@massDestroy',
                'as'   => 'courses.mass_destroy'
            ]);
            Route::post('courses_restore/{id}', [
                'uses' => 'Instructor\CoursesController@restore',
                'as'   => 'courses.restore'
            ]);
            Route::delete('courses_perma_del/{id}', [
                'uses' => 'Instructor\CoursesController@perma_del',
                'as'   => 'courses.perma_del'
            ]);
            Route::resource('lessons', 'Instructor\LessonsController');
            Route::post('lessons_mass_destroy', [
                'uses' => 'Instructor\LessonsController@massDestroy',
                'as'   => 'lessons.mass_destroy'
            ]);
            Route::post('lessons_restore/{id}', [
                'uses' => 'Instructor\LessonsController@restore',
                'as'   => 'lessons.restore'
            ]);
            Route::delete('lessons_perma_del/{id}', [
                'uses' => 'Instructor\LessonsController@perma_del',
                'as'   => 'lessons.perma_del'
            ]);
            Route::resource('questions', 'Instructor\QuestionsController');
            Route::post('questions_mass_destroy', [
                'uses' => 'Instructor\QuestionsController@massDestroy',
                'as'   => 'questions.mass_destroy'
            ]);
            Route::post('questions_restore/{id}', [
                'uses' => 'Instructor\QuestionsController@restore',
                'as'   => 'questions.restore'
            ]);
            Route::delete('questions_perma_del/{id}', [
                'uses' => 'Instructor\QuestionsController@perma_del',
                'as'   => 'questions.perma_del'
            ]);
            Route::resource('questions_options',
                'Instructor\QuestionsOptionsController');
            Route::post('questions_options_mass_destroy', [
                'uses' => 'Instructor\QuestionsOptionsController@massDestroy',
                'as'   => 'questions_options.mass_destroy'
            ]);
            Route::post('questions_options_restore/{id}', [
                'uses' => 'Instructor\QuestionsOptionsController@restore',
                'as'   => 'questions_options.restore'
            ]);
            Route::delete('questions_options_perma_del/{id}', [
                'uses' => 'Instructor\QuestionsOptionsController@perma_del',
                'as'   => 'questions_options.perma_del'
            ]);
            Route::resource('tests', 'Instructor\TestsController');
            Route::post('tests_mass_destroy', [
                'uses' => 'Instructor\TestsController@massDestroy',
                'as'   => 'tests.mass_destroy'
            ]);
            Route::post('tests_restore/{id}', [
                'uses' => 'Instructor\TestsController@restore',
                'as'   => 'tests.restore'
            ]);
            Route::delete('tests_perma_del/{id}', [
                'uses' => 'Instructor\TestsController@perma_del',
                'as'   => 'tests.perma_del'
            ]);
            Route::post('/spatie/media/upload',
                'Instructor\SpatieMediaController@create')
                ->name('media.upload');
            Route::post('/spatie/media/remove',
                'Instructor\SpatieMediaController@destroy')
                ->name('media.remove');

        });
});