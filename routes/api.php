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
    Route::group([
        'prefix'     => 'instructor',
        'namespace'  => 'Instructor',
        'middleware' => 'jwt.auth'
    ],
        function () {
            Route::get('/', 'DashboardController@index');
            Route::resource('permissions', 'PermissionsController');
            Route::post('permissions_mass_destroy', [
                'uses' => 'PermissionsController@massDestroy',
                'as'   => 'permissions.mass_destroy'
            ]);
            Route::resource('roles', 'RolesController');
            Route::post('roles_mass_destroy', [
                'uses' => 'RolesController@massDestroy',
                'as'   => 'roles.mass_destroy'
            ]);
            Route::resource('users', 'UsersController');
            Route::post('users_mass_destroy', [
                'uses' => 'UsersController@massDestroy',
                'as'   => 'users.mass_destroy'
            ]);
            Route::resource('courses', 'CoursesController');
            Route::post('courses_mass_destroy', [
                'uses' => 'CoursesController@massDestroy',
                'as'   => 'courses.mass_destroy'
            ]);
            Route::post('courses_restore/{id}', [
                'uses' => 'CoursesController@restore',
                'as'   => 'courses.restore'
            ]);
            Route::delete('courses_perma_del/{id}', [
                'uses' => 'CoursesController@perma_del',
                'as'   => 'courses.perma_del'
            ]);
            Route::resource('lessons', 'LessonsController');
            Route::post('lessons_mass_destroy', [
                'uses' => 'LessonsController@massDestroy',
                'as'   => 'lessons.mass_destroy'
            ]);
            Route::post('lessons_restore/{id}', [
                'uses' => 'LessonsController@restore',
                'as'   => 'lessons.restore'
            ]);
            Route::delete('lessons_perma_del/{id}', [
                'uses' => 'LessonsController@perma_del',
                'as'   => 'lessons.perma_del'
            ]);
            Route::resource('questions', 'QuestionsController');
            Route::post('questions_mass_destroy', [
                'uses' => 'QuestionsController@massDestroy',
                'as'   => 'questions.mass_destroy'
            ]);
            Route::post('questions_restore/{id}', [
                'uses' => 'QuestionsController@restore',
                'as'   => 'questions.restore'
            ]);
            Route::delete('questions_perma_del/{id}', [
                'uses' => 'QuestionsController@perma_del',
                'as'   => 'questions.perma_del'
            ]);
            Route::resource('questions_options',
                'QuestionsOptionsController');
            Route::post('questions_options_mass_destroy', [
                'uses' => 'QuestionsOptionsController@massDestroy',
                'as'   => 'questions_options.mass_destroy'
            ]);
            Route::post('questions_options_restore/{id}', [
                'uses' => 'QuestionsOptionsController@restore',
                'as'   => 'questions_options.restore'
            ]);
            Route::delete('questions_options_perma_del/{id}', [
                'uses' => 'QuestionsOptionsController@perma_del',
                'as'   => 'questions_options.perma_del'
            ]);
            Route::resource('tests', 'TestsController');
            Route::post('tests_mass_destroy', [
                'uses' => 'TestsController@massDestroy',
                'as'   => 'tests.mass_destroy'
            ]);
            Route::post('tests_restore/{id}', [
                'uses' => 'TestsController@restore',
                'as'   => 'tests.restore'
            ]);
            Route::delete('tests_perma_del/{id}', [
                'uses' => 'TestsController@perma_del',
                'as'   => 'tests.perma_del'
            ]);
            Route::post('/spatie/media/upload',
                'SpatieMediaController@create')
                ->name('media.upload');
            Route::post('/spatie/media/remove',
                'SpatieMediaController@destroy')
                ->name('media.remove');

        });
});