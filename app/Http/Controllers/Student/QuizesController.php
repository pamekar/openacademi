<?php

namespace App\Http\Controllers\Instructor;

use App\Lesson;
use App\Test;
use App\TestsResult;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class QuizesController extends Controller
{
    public function index($id, $lesson_slug)
    {
        $lesson = Lesson::where('slug', $lesson_slug)->where('published', true)
            ->firstOrFail();
        $purchased_course = $lesson->course->students()
                ->where('user_id', \Auth::id())->count() > 0;
        if ($purchased_course || $lesson->free_lesson) {
            $quiz = Test::with('instructions')->where('id', $id)->get();
            return response()->json($quiz);
        }

        $status = [
            'type'    => 'success',
            'message' => "Oops! Now is a good time to purchase the course"
        ];

        return response()->json($status);
    }

    public function show($id, $lesson_slug)
    {

    }

    public function results(Request $request)
    {
        $count = $request->input('count', 8);
        $results = $request->dashboard
            ? TestsResult::with(['test'])->where('user_id', Auth::id())
                ->latest('updated_at')->limit($count)->get()
            : TestsResult::with('test')->where('user_id', Auth::id())
                ->latest('updated_at')->paginate($count);

        return response()->json($results);
    }

    public function test($lesson_slug, Request $request)
    {
        $lesson = Lesson::where('slug', $lesson_slug)->firstOrFail();
        $answers = [];
        $test_score = 0;
        foreach ($request->get('questions') as $question_id => $answer_id) {
            $question = Question::find($question_id);
            $correct = QuestionsOption::where('question_id', $question_id)
                    ->where('id', $answer_id)
                    ->where('correct', 1)->count() > 0;
            $answers[] = [
                'question_id' => $question_id,
                'option_id'   => $answer_id,
                'correct'     => $correct
            ];
            if ($correct) {
                $test_score += $question->score;
            }
            /*
             * Save the answer
             * Check if it is correct and then add points
             * Save all test result and show the points
             */
        }
        $test_result = TestsResult::create([
            'test_id'     => $lesson->test->id,
            'user_id'     => \Auth::id(),
            'test_result' => $test_score
        ]);
        $test_result->answers()->createMany($answers);

        return redirect()
            ->route('lessons.show', [$lesson->course_id, $lesson_slug])
            ->with('message', 'Test score: ' . $test_score);
    }
}
