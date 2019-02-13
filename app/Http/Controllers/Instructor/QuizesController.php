<?php

namespace App\Http\Controllers\Instructor;

use App\Test;
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
        $lessons = \App\Lesson::whereIn('course_id', $courses_ids)->get(['title','id','course_id'])
     ;

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
        $lessons = \App\Lesson::whereIn('course_id', $courses_ids)->get()
            ->pluck('title', 'id')->prepend('Please select', '');

        $test = Test::findOrFail($id);
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
     * @param  int                                   $id
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
