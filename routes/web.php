<?php

use Illuminate\Support\Facades\Route;
use TCG\Voyager\Facades\Voyager;
Route::get('/', 'HomeController@index')->name('home');
Route::get('faq', 'HomeController@faq')->name('faq');
Route::get('courses/{category?}',
    ['uses' => 'CoursesController@index', 'as' => 'courses.all']);
Route::get('course/{slug}',
    ['uses' => 'CoursesController@show', 'as' => 'courses.show']);
Route::post('course/payment',
    ['uses' => 'CoursesController@payment', 'as' => 'courses.payment']);
Route::post('course/{course_id}/rating',
    ['uses' => 'CoursesController@rating', 'as' => 'courses.rating']);

Route::get('lesson/{course_id}/{slug}',
    ['uses' => 'LessonsController@show', 'as' => 'lessons.show']);
Route::post('lesson/{slug}/test',
    ['uses' => 'LessonsController@test', 'as' => 'lessons.test']);

// Authentication Routes...
Route::get('login', 'Auth\LoginController@showLoginForm')->name('auth.login');
Route::post('login', 'Auth\LoginController@login')->name('auth.login');
Route::post('logout', 'Auth\LoginController@logout')->name('auth.logout');

// Registration Routes...
Route::get('register', 'Auth\RegisterController@showRegistrationForm')
    ->name('auth.register');
Route::post('register', 'Auth\RegisterController@register')
    ->name('auth.register');

// Change Password Routes...
Route::get('change_password',
    'Auth\ChangePasswordController@showChangePasswordForm')
    ->name('auth.change_password');
Route::patch('change_password', 'Auth\ChangePasswordController@changePassword')
    ->name('auth.change_password');

// Password Reset Routes...
Route::get('password/reset',
    'Auth\ForgotPasswordController@showLinkRequestForm')
    ->name('auth.password.reset');
Route::post('password/email',
    'Auth\ForgotPasswordController@sendResetLinkEmail')
    ->name('auth.password.reset');
Route::get('password/reset/{token}',
    'Auth\ResetPasswordController@showResetForm')->name('password.reset');
Route::post('password/reset', 'Auth\ResetPasswordController@reset')
    ->name('auth.password.reset');
Route::group(['middleware' => 'auth'], function () {
    Route::get('dashboard', function () {
        return view('dashboard.student.index');
    })->name('dashboard');
});
Route::group(['middleware' => ['instructor'], 'prefix' => 'instructor', 'as' => 'instructor.'],
    function () {
        Route::get('/home', 'Instructor\DashboardController@index');
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
        Route::post(    'lessons_mass_destroy', [
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
            'Instructor\SpatieMediaController@create')->name('media.upload');
        Route::post('/spatie/media/remove',
            'Instructor\SpatieMediaController@destroy')->name('media.remove');

    });
Route::get('debug/kldjfklfdujkewiojdk', function () {
    $lessons = \App\Lesson::all();
    foreach ($lessons as $lesson) {
        \Illuminate\Support\Facades\DB::table('lessons')
            ->where('id', $lesson->id)->update([
                'slug' => strtolower(preg_replace('/\s+/', '-',
                    $lesson->title))
            ]);
    }
    echo "Executed - " . count($lessons) . " instructions executed";
});

Route::group(['prefix' => 'admin'], function () {
    Voyager::routes();
});
