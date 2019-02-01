<?php

namespace App\Http\Controllers\Instructor;

use App\Course;
use App\CourseCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use App\Http\Controllers\Controller;
use App\Http\Requests\Instructor\StoreCoursesRequest;
use App\Http\Requests\Instructor\UpdateCoursesRequest;
use App\Http\Controllers\Traits\FileUploadTrait;

class CoursesController extends Controller
{
    use FileUploadTrait;

    /**
     * Display a listing of Course.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $limit = 6;
        if (!Gate::allows('course_access')) {
            return abort(401);
        }

        if (!request('page')) {
            $courses = Course::ofTeacher()->get();
        } elseif (request('show_deleted') == 1) {
            if (!Gate::allows('course_delete')) {
                return abort(401);
            }
            $courses = Course::onlyTrashed()->ofTeacher()->paginate($limit);
        } else {
            $courses = Course::ofTeacher()->paginate($limit);
        }

        return response()->json($courses);
    }

    /**
     * Show the form for creating new Course.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        if (!Gate::allows('course_create')) {
            return abort(401);
        }
        $teachers = \App\User::whereHas('role', function ($q) {
            $q->where('role_id', 2);
        })->get()->pluck('name', 'id');

        return view('admin.courses.create', compact('teachers'));
    }

    public function getCategories()
    {
        $categories = CourseCategory::select('id', 'title')->get();
        return response()->json($categories);
    }

    /**
     * Store a newly created Course in storage.
     *
     * @param  \App\Http\Requests\StoreCoursesRequest $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCoursesRequest $request)
    {
        if (!Gate::allows('course_create')) {
            return abort(401);
        }
        $request = $this->saveFiles($request);
        $course_data = $this->setCourse($request);

        $course = Course::create($course_data);
        $teachers = [\Auth::user()->id];
        //\Auth::user()->isInstructor() ? array_filter((array)$request->input('teachers')) : ;
        $course->teachers()->sync($teachers);

        $status = [
            'type'      => 'success',
            'message'   => "$course->title has been added successfully",
            'course_id' => $course->id
        ];

        return response()->json($status);
    }


    /**
     * Show the form for editing Course.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        if (!Gate::allows('course_edit')) {
            return abort(401);
        }
        $teachers = \App\User::whereHas('role', function ($q) {
            $q->where('role_id', 2);
        })->get()->pluck('name', 'id');

        $course = Course::with('lessons')->findOrFail($id);

        return response()->json($course);
    }

    /**
     * Update Course in storage.
     *
     * @param  \App\Http\Requests\UpdateCoursesRequest $request
     * @param  int                                     $id
     *
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCoursesRequest $request, $id)
    {
        if (!Gate::allows('course_edit')) {
            return abort(401);
        }
        $request = $this->saveFiles($request);

        $course = Course::findOrFail($id);
        $course->update($request->all());

        $teachers = [\Auth::user()->id];
        /*\Auth::user()->isInstructor()
        ? array_filter((array)$request->input('teachers'))
        : [\Auth::user()->id];*/
        $course->teachers()->sync($teachers);

        $status = [
            'type'    => 'success',
            'message' => "$course->title has been updated successfully"
        ];

        return response()->json($status);
    }


    /**
     * Display Course.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if (!Gate::allows('course_view')) {
            return abort(401);
        }
        $teachers = \App\User::get()->pluck('name', 'id');
        $lessons = \App\Lesson::where('course_id', $id)->get();
        $tests = \App\Test::where('course_id', $id)->get();

        $course = Course::findOrFail($id);

        return response()->json(['course' => $course]);
    }


    /**
     * Remove Course from storage.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (!Gate::allows('course_delete')) {
            return abort(401);
        }
        $course = Course::findOrFail($id);
        $course->delete();

        return redirect()->route('instructor.courses.index');
    }

    /**
     * Delete all selected Course at once.
     *
     * @param Request $request
     */
    public function massDestroy(Request $request)
    {
        if (!Gate::allows('course_delete')) {
            return abort(401);
        }
        if ($request->input('ids')) {
            $entries = Course::whereIn('id', $request->input('ids'))->get();

            foreach ($entries as $entry) {
                $entry->delete();
            }
        }
    }


    /**
     * Restore Course from storage.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        if (!Gate::allows('course_delete')) {
            return abort(401);
        }
        $course = Course::onlyTrashed()->findOrFail($id);
        $course->restore();

        return redirect()->route('instructor.courses.index');
    }

    /**
     * Permanently delete Course from storage.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function perma_del($id)
    {
        if (!Gate::allows('course_delete')) {
            return abort(401);
        }
        $course = Course::onlyTrashed()->findOrFail($id);
        $course->forceDelete();

        return redirect()->route('instructor.courses.index');
    }

    public function setCourse(Request $request)
    {
        $course = $request->all();
        $slug = str_slug($course['title'], '-');
        $uniqueSlug = $slug;

        while (Course::where('slug', $uniqueSlug)->first()) {
            $uniqueSlug = "$slug-" . mt_rand(10, 100);
        }
        $course['slug'] = $uniqueSlug;
        $course['user_id'] = Auth::user()->id;
        return $course;
    }
}
