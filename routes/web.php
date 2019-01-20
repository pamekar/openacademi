<?php

use Illuminate\Support\Facades\Route;
use TCG\Voyager\Facades\Voyager;

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

Route::get('/course/payment/initialize/{slug}',
    'PaystackController@initializePayment');

Route::get('/course/payment/verify','PaystackController@verifyPayment');
// Authentication Routes...

// Change Password Routes...

Route::get('change_password',
    'Auth\ChangePasswordController@showChangePasswordForm')
    ->name('change_password');
Route::patch('change_password', 'Auth\ChangePasswordController@changePassword')
    ->name('change_password');

// drg >> application routes

Route::get('faq', 'HomeController@faq')->name('faq');

Route::group(['middleware' => 'auth'], function () {
    Route::get('/user', function () {
        return view('dashboard.student.index');
    })->name('dashboard');

});

Route::get('/', 'HomeController@index');
Route::get('/home', 'HomeController@index')->name('home');

Route::group([
    'middleware' => ['instructor'],
    'prefix'     => 'instructor',
    'as'         => 'instructor.'
],
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
            'Instructor\SpatieMediaController@create')->name('media.upload');
        Route::post('/spatie/media/remove',
            'Instructor\SpatieMediaController@destroy')->name('media.remove');

    });
Route::get('debug/kldjfklfdujkewiojdk', function () {
    $lessons = \App\Lesson::all();
    foreach ($lessons as $lesson) {
        \Illuminate\Support\Facades\DB::table('lessons')
            ->where('id', $lesson->id)->update([
                'duration' => mt_rand(2, 20) * 60 + mt_rand(0, 59)
            ]);
    }
    echo "Executed - " . count($lessons) . " instructions executed";
});

Route::get('sjkdhnsd', function () {
    $duration = \App\Lesson::where('course_id', 50)->where('published', 1)
        ->sum('duration');

    echo $duration;
});

Route::group(['prefix' => 'admin'], function () {
    Voyager::routes();
});


// Password Reset Routes...
Route::get('password/reset',
    'Auth\ForgotPasswordController@showLinkRequestForm')
    ->name('password.reset');
Route::post('password/email',
    'Auth\ForgotPasswordController@sendResetLinkEmail')
    ->name('password.reset');
Route::get('password/reset/{token}',
    'Auth\ResetPasswordController@showResetForm')->name('password.reset');
Route::post('password/reset', 'Auth\ResetPasswordController@reset')
    ->name('password.reset');


Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('login', 'Auth\LoginController@login')->name('login');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');

// Registration Routes...
Route::get('register', 'Auth\RegisterController@showRegistrationForm')
    ->name('register');
Route::post('register', 'Auth\RegisterController@register')
    ->name('register');
