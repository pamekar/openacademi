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

Route::get('/course/payment/verify', 'PaystackController@verifyPayment');
// Authentication Routes...

// Change Password Routes...

Route::get('change_password',
    'Auth\ChangePasswordController@showChangePasswordForm')
    ->name('change_password');
Route::patch('change_password', 'Auth\ChangePasswordController@changePassword')
    ->name('change_password');

// drg >> application routes

Route::get('faq', 'HomeController@faq')->name('faq');

Route::group(['middleware' => ['auth', 'isStudent']], function () {
    Route::get('/user', function () {
        return view('dashboard.student.index');
    })->name('user');

});

Route::get('/', 'HomeController@index');
Route::get('/home', 'HomeController@index')->name('home');

Route::group([
    'middleware' => ['auth','isInstructor'],
    'as'         => 'instructor.'
],
    function ()
    {
        Route::get('/instructor', function () {
            return view('dashboard.instructor.index');
        })->name('instructor');
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

Route::get('authorization', function(){
    $word=0?"Is a false assignment":"guess it's true";

    echo $word;
});