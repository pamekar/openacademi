<?php

namespace App\Http\Controllers\Student;

use App\Lesson;
use App\Question;
use App\QuestionsOption;
use App\Test;
use App\TestsResult;
use App\TestsResultsAnswer;
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
            $data['quiz_id'] = $result->id;
            return response()->json($data);
        }

        $status = [
            'type'    => 'success',
            'message' => "Oops! Now is a good time to purchase the course"
        ];

        return response()->json($status);
    }

    public function check($id, Request $request)
    {
        // drg >> get result for the particular quiz
        $result = TestsResult::where('user_id', Auth::id())->findOrFail($id);

        return response()->json([
            'status' => $result->status,
            'test'   => $result->test->title,
            'description'=>$result->test->about_quiz
        ]);
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
        // drg >> get result for the particular quiz
        $result = TestsResult::where('user_id', Auth::id())->findOrFail($id);

        // drg >> get the specified test
        $quiz = Test::with('questions.options')->findOrFail($result->test_id);

        // drg >> get the specific lesson
        $lesson = Lesson::where('id', $quiz->lesson_id)
            ->where('published', true)
            ->firstOrFail();
        $purchased_course = $lesson->course->students()
                ->where('user_id', \Auth::id())->count() > 0;
        $questions = $quiz->questions->toArray();
        shuffle($questions);
        if (($purchased_course || $lesson->free_lesson)) {
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

    public function review($id)
    {
        // drg >> get result for the particular quiz
        $result = TestsResult::with('answers.question.options',
            'answers.review')
            ->where('user_id', Auth::id())->findOrFail($id);

        // drg >> get the specified test
        $quiz = Test::findOrFail($result->test_id);

        return response()->json([
            'quiz'   => $quiz,
            'result' => $result
        ]);
    }

    public function start($id)
    {
        $result = TestsResult::where('user_id', Auth::id())
            ->where('status', '<>', 'completed')->findOrFail($id);
        if (is_null($result->started_at)) {
            $result->status = 'active';
            $result->started_at = now();
            $result->save();

            $startDate = new \DateTime($result->started_at);
            return response()->json($startDate->format('U'));
        }

        $startDate = new \DateTime($result->started_at);
        return response()->json($startDate->format('U'));
    }

    public function submit($id, $completed = null, Request $request)
    {
        $result = TestsResult::where('user_id', Auth::id())
            ->where('status', 'active')->findOrFail($id);

        $status = $completed ? 'completed' : 'active';
        $test_score = 0;
        $total_score = 0;
        foreach ($request->all() as $answer) {
            $question = Question::find($answer['question']);
            switch ($question->type) {
                case 'radio':
                    $correct = QuestionsOption::where('question_id',
                            $question->id)
                            ->where('id', $answer['answer'])
                            ->where('correct', 1)->count() > 0;
                    // drg >> save answers
                    TestsResultsAnswer::where('created_at', '>',
                        $result->started_at)->updateOrCreate([
                        'tests_result_id' => $result->id,
                        'question_id'     => $question->id,

                    ], [
                        'option_id'   => $answer['answer'],
                        'correct'     => $correct,
                        'answer_type' => $question->type
                    ]);

                    if ($correct) {
                        $test_score += $question->score;
                    }
                    break;
                default:
                    // drg >> save answers
                    TestsResultsAnswer::where('created_at', '>',
                        $result->started_at)->updateOrCreate([
                        'tests_result_id' => $result->id,
                        'question_id'     => $question->id,
                    ], [
                        'answer_text' => $answer['answer'],
                        'answer_type' => $question->type
                    ]);
                    break;
            }
            $total_score += $question->score;
        }
        $result->update([
            'test_result' => $test_score,
            'total_score' => $total_score,
            'status'      => $status
        ]);

        return response()->json($test_score);
    }


    /**
     * Remove Result from storage.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $result = TestsResult::findOrFail($id);
        $result->user_id !== Auth::id() ? abort(403,
            'You cannot delete this course') : $result->delete();

        $status = [
            'type'    => 'success',
            'message' => "Result has been deleted successfully"
        ];

        return response()->json($status);
    }

}
