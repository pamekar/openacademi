<?php

namespace App\Http\Controllers\Student;

use App\Course;
use App\Http\Controllers\Controller;
use App\Lesson;
use App\Question;
use App\QuestionsOption;
use App\TestsResult;
use Illuminate\Http\Request;

class LessonsController extends Controller
{

    public function show($course_id, $lesson_slug)
    {
        $lesson = Lesson::where('slug', $lesson_slug)->where('published', true)
            ->where('course_id', $course_id)->firstOrFail();
        //dd($lesson); exit;
        if (\Auth::check()) {
            if ($lesson->students()->where('id', \Auth::id())->count() == 0) {
                $lesson->students()->attach(\Auth::id());
            }
        }

        $test_result = null;
        if ($lesson->test) {
            $test_result = TestsResult::where('test_id', $lesson->test->id)
                ->where('user_id', \Auth::id())
                ->first();
        }

        $course = Course::where('id', $course_id)->with('publishedLessons')
            ->firstOrFail()->append('duration');

        $purchased_course = $lesson->course->students()
                ->where('user_id', \Auth::id())->count() > 0;
        $test_exists = false;
        if ($lesson->test && $lesson->test->questions->count() > 0) {
            $test_exists = true;
        }
        if ($purchased_course || $lesson->free_lesson) {
            return response()->json([
                'lesson'           => $lesson,
                'course'           => $course,
                'test_result'      => $test_result,
                'purchased_course' => $purchased_course,
                'test_exists'      => $test_exists
            ]);
        }

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
