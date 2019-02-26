<?php

namespace App\Http\Controllers\Instructor;

use App\Test;
use App\TestsResult;
use App\TestsResultsAnswer;
use App\TestsResultsAnswersReview;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use App\Http\Controllers\Controller;
use App\Http\Requests\Instructor\StoreQuizesRequest;
use App\Http\Requests\Instructor\UpdateQuizesRequest;

class QuizesController extends Controller
{
    /**
     * Display a listing of Test.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $limit = 6;

        if (!Gate::allows('test_access')) {
            return abort(401);
        }

        if (request('show_deleted') == 1) {
            if (!Gate::allows('test_delete')) {
                return abort(401);
            }
            $tests = Test::onlyTrashed()->paginate($limit);
        } else {
            $tests = Test::paginate($limit);
        }

        return response()->json($tests);
    }

    /**
     * Show the form for creating new Test.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        if (!Gate::allows('test_create')) {
            return abort(401);
        }
        $courses = \App\Course::ofTeacher()->get();
        $courses_ids = $courses->pluck('id');
        $courses = $courses->pluck('title', 'id')->prepend('Please select', '');
        $lessons = \App\Lesson::whereIn('course_id', $courses_ids)
            ->get(['title', 'id', 'course_id']);

        return response()->json(['courses' => $courses, 'lessons' => $lessons]);

    }

    /**
     * Store a newly created Test in storage.
     *
     * @param  \App\Http\Requests\StoreQuizesRequest $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(StoreQuizesRequest $request)
    {
        if (!Gate::allows('test_create')) {
            return abort(401);
        }
        $test = Test::create($request->all());

        $status = [
            'type'    => 'success',
            'message' => "$test->title has been created successfully"
        ];

        return response()->json($status);
    }

    /**
     * Store a newly created answer review in storage.
     *
     * @param  Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function storeReview(Request $request, $id)
    {
        if (!Gate::allows('test_create')) {
            return abort(401);
        }
        $answer = TestsResultsAnswer::findOrFail($id);
        $test = TestsResult::findOrFail($answer->tests_result_id);

        // drg >> update the testScore
        $test->test_result = $test->test_result + $request->score;
        $answer->correct = $request->score > 0;
        $answer->save();
        $test->save();
        $answer->review()->create($request->all());

        $status = [
            'type'    => 'success',
            'message' => "Your review has been created successfully"
        ];

        return response()->json($status);
    }

    /**
     * Show the form for editing Test.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        if (!Gate::allows('test_edit')) {
            return abort(401);
        }
        $courses = \App\Course::ofTeacher()->get();
        $courses_ids = $courses->pluck('id');
        $courses = $courses->pluck('title', 'id')->prepend('Please select', '');
        $lessons = \App\Lesson::whereIn('course_id', $courses_ids)
            ->get(['title', 'id', 'course_id']);
        $test = Test::with('questions')->findOrFail($id);
        return response()->json([
            'test'    => $test,
            'courses' => $courses,
            'lessons' => $lessons
        ]);
    }

    /**
     * Update Test in storage.
     *
     * @param  \App\Http\Requests\UpdateQuizesRequest $request
     * @param  int                                    $id
     *
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateQuizesRequest $request, $id)
    {
        if (!Gate::allows('test_edit')) {
            return abort(401);
        }
        $test = Test::findOrFail($id);
        $test->update($request->all());

        $status = [
            'type'    => 'success',
            'message' => "$test->title has been updated successfully"
        ];

        return response()->json($status);
    }

    /**
     * Update Review
     *
     * @param  Request $request
     * @param  int     $id
     *
     * @return \Illuminate\Http\Response
     */
    public function updateReview(Request $request, $id)
    {
        if (!Gate::allows('test_edit')) {
            return abort(401);
        }
        $review = TestsResultsAnswersReview::findOrFail($id);

        $answers
            = TestsResultsAnswer::findOrFail($review->tests_results_answer_id);
        $test = TestsResult::findOrFail($answers->tests_result_id);

        // drg >> update the testScore
        $test->test_result = $test->test_result - $answers->review->score
            + $request->score;

        $answers->correct = $request->score > 0;
        $answers->save();

        $review->update($request->all());

        $test->save();
        $status = [
            'type'    => 'success',
            'message' => "Your review has been updated"
        ];

        return response()->json($status);
    }

    /**
     * Display Test.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if (!Gate::allows('test_view')) {
            return abort(401);
        }
        $test = Test::findOrFail($id);

        return response()->json($test);
    }

    /**
     * Display List of Results
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function results($id)
    {
        if (!Gate::allows('test_view')) {
            return abort(401);
        }
        $results = TestsResult::where('test_id', $id)
            ->orderBy('created_at', 'desc')
            ->with('answers.question', 'answers.review')
            ->paginate(10);

        return response()->json($results);
    }

    /**
     * Remove Test from storage.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (!Gate::allows('test_delete')) {
            return abort(401);
        }
        $test = Test::findOrFail($id);
        $test->delete();

        $status = [
            'type'    => 'success',
            'message' => "$test->title has been deleted successfully"
        ];

        return response()->json($status);
    }

    /**
     * Delete all selected Test at once.
     *
     * @param Request $request
     */
    public function massDestroy(Request $request)
    {
        if (!Gate::allows('test_delete')) {
            return abort(401);
        }
        if ($request->input('ids')) {
            $entries = Test::whereIn('id', $request->input('ids'))->get();

            foreach ($entries as $entry) {
                $entry->delete();
            }
        }
    }


    /**
     * Restore Test from storage.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        if (!Gate::allows('test_delete')) {
            return abort(401);
        }
        $test = Test::onlyTrashed()->findOrFail($id);
        $test->restore();

        $status = [
            'type'    => 'success',
            'message' => "Test has been restored successfully"
        ];

        return response()->json($status);
    }

    /**
     * Permanently delete Test from storage.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function perma_del($id)
    {
        if (!Gate::allows('test_delete')) {
            return abort(401);
        }
        $test = Test::onlyTrashed()->findOrFail($id);
        $test->forceDelete();

        $status = [
            'type'    => 'success',
            'message' => "Test has been permanently"
        ];

        return response()->json($status);
    }
}
