<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use TCG\Voyager\Facades\Voyager;


Route::get('courses/search',
    ['uses' => 'CoursesController@search', 'as' => 'courses.search']);
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

// Change Password Routes...

Route::get('change_password',
    'Auth\ChangePasswordController@showChangePasswordForm')
    ->name('change_password');
Route::patch('change_password', 'Auth\ChangePasswordController@changePassword')
    ->name('change_password');

// drg >> application routes

Route::get('faq', 'HomeController@faq')->name('faq');

// logged in user dashboard
Route::group(['middleware' => ['auth']], function () {
    Route::get('/user/{all?}', function () {
        if (Auth::user()->isStudent()) {
            return view('dashboard.student.index');
        } elseif (Auth::user()->isInstructor()) {
            return view('dashboard.instructor.index');
        }
        return redirect('/');
    })->where(['all' => '.*'])->name('user');

});

Route::get('/', 'HomeController@index');
Route::get('/home', 'HomeController@index')->name('home');
Route::group(['prefix' => 'admin'], function () {
    Voyager::routes();
});

Auth::routes();
Route::get('/login/redirect/{provider}', 'Auth\SocialController@redirect')->name('login.social');
Route::get('/login/callback/{provider}', 'Auth\SocialController@callback');

Route::group(['middleware' => 'checkLoggedIn'], function () {
    Route::group([
        'namespace'  => 'Student',
        'middleware' => 'auth'
    ],
        function () {
            Route::get('lesson/{id}/{slug}/download',
                'LessonsController@download');
        });
});

Route::group(['middleware' => 'checkLoggedIn'], function () {
    Route::group([
        'prefix'     => 'instructor',
        'namespace'  => 'Instructor',
        'middleware' => 'auth'
    ],
        function () {
            Route::resource('media', 'MediaController');
        });
});


