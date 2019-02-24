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

Route::group(['middleware' => ['auth']], function () {
    Route::get('/user', function () {
        if (\Illuminate\Support\Facades\Auth::user()->isStudent()) {
            return view('dashboard.student.index');
        } elseif (\Illuminate\Support\Facades\Auth::user()->isInstructor()) {
            return view('dashboard.instructor.index');
        }
        return redirect('/');
    })->name('user');

});

Route::get('/', 'HomeController@index');
Route::get('/home', 'HomeController@index')->name('home');
Route::get('debug/kldjfklfdujkewiojdk', function () {
    $lessons = \App\Lesson::all();
    $courseImages = [
        "course1.jpg",
        "course2.jpg",
        "course3.jpg",
        "course4.jpg",
        "course5.jpg",
        "course6.jpg",
        "course7.jpg",
        "course8.jpg",
        "course9.jpg",
        "course10.jpg",
        "course11.jpg",
        "course12.jpg",
        "course13.jpg",
        "course14.jpg",
        "course15.jpg"
    ];

    foreach ($lessons as $lesson) {
        \Illuminate\Support\Facades\DB::table('lessons')
            ->where('id', $lesson->id)->update([
                'lesson_image_preview' => "public/uploads/"
                    . $courseImages[array_rand($courseImages)]
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

Route::post('upload', function () {

    return response()->json([
        "success" => true,
        "error"   => null,
        "url"     => "http://test.dev:8000/assets/images/people/50/guy-6.jpg"
    ], 200);
});

Route::get('kjsdsjdsksdncxmkjdsiwejkmwem/add_about_quiz', function () {
    $faker = \Faker\Factory::create();
    $tests = \App\Test::all();
    foreach ($tests as $test) {
        \Illuminate\Support\Facades\DB::table('tests')->where('id', $test->id)
            ->update(['about_quiz' => $faker->realText(150)]);
    }
});

Route::get('kujsdlkdjlksere', function () {
    // drg >> this route sets test results answers
    $faker = \Faker\Factory::create();
    $tests = \App\Test::with(['results', 'questions.options'])->get()
        ->shuffle();
    $id = 0;

    /*$setQuestions = \App\Question::all();
    foreach ($setQuestions as $qst) {
        $falsify = [0, 1, 0, 1, 0, 0, 0];
        if ($falsify[array_rand($falsify)]) {
            $types = ['textarea', 'input', 'richtext'];
            $type = $types[array_rand($types)];
        } else {
            $type = 'radio';
        }
        $question = \App\Question::find($qst->id);
        $question->type = $type;
        $question->save();

    }*/
    foreach ($tests as $test) {
        // drg >> loop through tests
        $questions = $test->questions->shuffle();
        $questions_length = count($test->questions);
        $results_length = $test->results->count();
        $j = 0;
        foreach ($test->results as $result) {
            // drg >> loop through results
            $k = 0;
            $score = 0;
            $answers = [];
            $hasReview=false;
            foreach ($questions as $question) {
                $id++;
                $hasReview=$question->type !== 'radio';
                // drg >> loop through test questions
                $options = $question->options;
                $option = null;
                // drg >> text to be used for review
                $review = null;
                // drg >>flag if review is correct
                $correctReview = $k > 0.45 * $questions_length
                    ? mt_rand(0, 1)
                    : 1;
                switch ($question->type) {
                    case 'radio':
                        $option = $k > 0.45 * $questions_length
                            ? $options[array_rand($options->toArray())]
                            : $options->where('correct', true)->first();
                        $correctReview = null;
                        break;
                    case 'input':
                        $review = $faker->realText(50);
                        break;
                    case 'textarea':
                        $review = $faker->realText(200);
                        break;
                    case 'richtext':
                        $review = $faker->paragraph(4) . "<br>"
                            . $faker->paragraph(5) . "<br>"
                            . $faker->paragraph(3) . "<br>"
                            . $faker->paragraph(7);
                        break;
                    default:
                        $option = null;
                        $review = null;
                        break;
                }
                // drg >> flag for 'answer and review is correct'
                $correct = is_null($correctReview) ? $option->correct
                    : $correctReview;
                array_push($answers, [
                    'id'              => $id,
                    'tests_result_id' => $result->id,
                    'question_id'     => $question->id,
                    'option_id'       => $option ? $option->id : null,
                    'correct'         => $correct,
                    'review'          => $review
                ]);
                if ($hasReview) {
                    $reviewScore = $correctReview
                        ? floor((mt_rand(55, 100) / 100) * $question->score)
                        : 0;
                    $answerReview = new \App\TestsResultsAnswersReview();
                    $answerReview->tests_results_answer_id = $id;
                    $answerReview->review = $review;
                    $answerReview->score = $reviewScore;
                    $score += $reviewScore;
                }
                $score += $option && $option->correct ? $question->score : 0;
                $k++;
            }


            \App\TestsResultsAnswer::insert($answers);
            if ($hasReview) {
                $answerReview->save();
            }
            \App\TestsResult::where('id', $result->id)->update([
                'test_result' => $score,
                'updated_at'  => date('Y-m-d H:i:s')
            ]);
            $j++;
        }
    }
});