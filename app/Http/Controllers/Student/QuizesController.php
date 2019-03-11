<?php

namespace App\Http\Controllers\Student;

use App\Lesson;
use App\Question;
use App\QuestionsOption;
use App\Test;
use App\TestsResult;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class QuizesController extends Controller
{
    public function index($id, $lesson_slug)
    {
        $lesson = Lesson::where('slug', $lesson_slug)->where('published', true)
            ->firstOrFail();
        $purchased_course = $lesson->course->students()
                ->where('user_id', \Auth::id())->count() > 0;
        if ($purchased_course || $lesson->free_lesson) {

            $quiz = Test::findOrFail($id);

            $result = TestsResult::where('test_id', $quiz->id)
                ->where('user_id', Auth::id())
                ->where('status', '<>', 'completed')->first();
            $data = [
                'instructions' => $quiz->instructions,
                'quiz'         => $quiz
            ];
            if (!$result) {
                $result = new TestsResult();
                $result->test_id = $quiz->id;
                $result->user_id = Auth::id();
                $result->status = 'pending';
                $result->test_result = 0;
                $result->save();
            }

            return response()->json($data);
        }

        $status = [
            'type'    => 'success',
            'message' => "Oops! Now is a good time to purchase the course"
        ];

        return response()->json($status);
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

    public function show($id)
    {
        $quiz = Test::with('questions.options')->findOrFail($id);

        $lesson = Lesson::where('id', $quiz->lesson_id)
            ->where('published', true)
            ->firstOrFail();
        $purchased_course = $lesson->course->students()
                ->where('user_id', \Auth::id())->count() > 0;
        $result = TestsResult::where('test_id', $quiz->id)
            ->where('user_id', Auth::id())
            ->where('status', '<>', 'completed')->first();
        $questions = $quiz->questions->toArray();
        shuffle($questions);
        if (($purchased_course || $lesson->free_lesson) && $result) {
            return response()->json([
                'quiz'      => $quiz,
                'questions' => $questions,
                'result'    => $result
            ]);
        }

        $status = [
            'type'    => 'success',
            'message' => "Oops! Now is a good time to purchase the course"
        ];

        return response()->json($status);
    }

    public function start($id)
    {
        $result = TestsResult::where('test_id', $id)
            ->where('user_id', Auth::id())
            ->where('status', 'active')->first();
        if (is_null($result->started_at)) {
            $setResult = TestsResult::find($result->id);
            $setResult->status = 'active';
            $setResult->started_at = now();
            $setResult->save();

            $startDate= new \DateTime($setResult->started_at);
            return response()->json($startDate->format('U'));
        }

        $startDate= new \DateTime($result->started_at);
        return response()->json($startDate->format('U'));
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
