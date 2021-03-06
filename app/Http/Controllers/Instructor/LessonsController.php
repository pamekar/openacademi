<?php

namespace App\Http\Controllers\Instructor;

use App\Course;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\FileUploadTrait;
use App\Http\Requests\Instructor\StoreLessonsRequest;
use App\Http\Requests\Instructor\UpdateLessonsRequest;
use App\Lesson;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Spatie\MediaLibrary\Models\Media;

class LessonsController extends Controller
{
    use FileUploadTrait;

    /**
     * Display a listing of Lesson.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if (!Gate::allows('lesson_access')) {
            return abort(401);
        }

        $lessons = Lesson::whereIn('course_id',
            Course::ofTeacher()->pluck('id'));
        if ($request->input('course_id')) {
            $lessons = $lessons->where('course_id',
                $request->input('course_id'));
        }
        if (request('show_deleted') == 1) {
            if (!Gate::allows('lesson_delete')) {
                return abort(401);
            }
            $lessons = $lessons->onlyTrashed()->get();
        } else {
            $lessons = $lessons->get();
        }

        return response()->json($lessons);
    }

    /**
     * Show the form for creating new Lesson.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        if (!Gate::allows('lesson_create')) {
            return abort(401);
        }
        $courses = \App\Course::ofTeacher()->get()->pluck('title', 'id');
        return response()->json($courses);
    }

    /**
     * Store a newly created Lesson in storage.
     *
     * @param \App\Http\Requests\StoreLessonsRequest $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(StoreLessonsRequest $request)
    {
        if (!Gate::allows('lesson_create')) {
            return abort(401);
        }
        $request = $this->saveFiles($request);
        $lesson_data = $this->setLesson($request);

        $lesson = Lesson::create($lesson_data
            + [
                'position' => Lesson::where('course_id', $request->course_id)
                        ->max('position') + 1
            ]);


        foreach (
            explode(',', $request->input('resource_files_id', [])) as $id
        ) {
            $model = config('laravel-medialibrary.media_model');
            $file = $model::find($id);
            $file->model_id = $lesson->id;
            $file->save();
        }

        $status = [
            'type'      => 'success',
            'message'   => "$lesson->title has been added successfully",
            'course_id' => $lesson->course_id
        ];

        return response()->json($status);
    }


    /**
     * Show the form for editing Lesson.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        if (!Gate::allows('lesson_edit')) {
            return abort(401);
        }
        $courses = \App\Course::ofTeacher()->get()->pluck('title', 'id')
            ->prepend('Please select', '');

        $lesson = Lesson::findOrFail($id);

        return response()->json(['courses' => $courses, 'lesson' => $lesson]);

    }

    /**
     * Update Lesson in storage.
     *
     * @param \App\Http\Requests\UpdateLessonsRequest $request
     * @param int                                     $id
     *
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateLessonsRequest $request, $id)
    {
        if (!Gate::allows('lesson_edit')) {
            return abort(401);
        }
        $request = $this->saveFiles($request);
        $lesson = Lesson::findOrFail($id);
        $lesson->update($request->all());

        $media = [];

        $resourceFiles = $request->input('resource_files_id', null);

        if (!empty($resourceFiles)) {
            $resourceFilesArr = explode(',', $resourceFiles);
            $deleted = array_diff($lesson->resource_files_id,
                $resourceFilesArr);
            // check if resource files have been updated
            if ($deleted) {
                foreach ($deleted as $id) {
                    Media::where([
                        ['id', $id],
                        ['model_type', 'App\Lesson'],
                        ['model_id', $lesson->id]
                    ])->delete();
                }
            }
        }

        $status = [
            'type'    => 'success',
            'message' => "$lesson->title has been updated successfully"
        ];

        return response()->json($status);
    }


    /**
     * Display Lesson.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if (!Gate::allows('lesson_view')) {
            return abort(401);
        }
        /*$courses = \App\Course::get()->pluck('title', 'id')
            ->prepend('Please select', '');*/
        $tests = \App\Test::where('lesson_id', $id)->get();

        $lesson = Lesson::findOrFail($id);

        $course = Course::where('id', $lesson->course_id)->with('lessons')
            ->firstOrFail();
        return response()->json([
            'tests'  => $tests,
            'lesson' => $lesson,
            'course' => $course
        ]);

    }


    /**
     * Remove Lesson from storage.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (!Gate::allows('lesson_delete')) {
            return abort(401);
        }
        $lesson = Lesson::findOrFail($id);
        $lesson->delete();


        $status = [
            'type'    => 'success',
            'message' => "$lesson->title has been deleted successfully"
        ];

        return response()->json($status);
    }

    /**
     * Delete all selected Lesson at once.
     *
     * @param Request $request
     */
    public function massDestroy(Request $request)
    {
        if (!Gate::allows('lesson_delete')) {
            return abort(401);
        }
        if ($request->input('ids')) {
            $entries = Lesson::whereIn('id', $request->input('ids'))->get();

            foreach ($entries as $entry) {
                $entry->delete();
            }
        }
    }


    /**
     * Restore Lesson from storage.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        if (!Gate::allows('lesson_delete')) {
            return abort(401);
        }
        $lesson = Lesson::onlyTrashed()->findOrFail($id);
        $lesson->restore();

        return redirect()->route('instructor.lessons.index');
    }

    /**
     * Permanently delete Lesson from storage.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function perma_del($id)
    {
        if (!Gate::allows('lesson_delete')) {
            return abort(401);
        }
        $lesson = Lesson::onlyTrashed()->findOrFail($id);
        $lesson->forceDelete();

        return redirect()->route('instructor.lessons.index');
    }

    public function setLesson(Request $request)
    {
        $lesson = $request->all();
        $slug = str_slug($lesson['title'], '-');
        $uniqueSlug = $slug;

        while (Lesson::where('slug', $uniqueSlug)->first()) {
            $uniqueSlug = "$slug-" . mt_rand(10, 100);
        }
        $lesson['slug'] = $uniqueSlug;
        $lesson['user_id'] = Auth::user()->id;
        return $lesson;
    }
}
