<?php

namespace App\Http\Controllers\Student;

use App\Course;
use App\Http\Controllers\Controller;
use App\Lesson;
use App\TestsResult;

/**
 * Class LessonsController
 *
 * @package App\Http\Controllers\Student
 */
class LessonsController extends Controller
{

    public function show($course_id, $lesson_slug)
    {
        $lesson = Lesson::where('slug', $lesson_slug)->where('published', true)
            ->where('course_id', $course_id)->firstOrFail();

        $canAccess = $this->canAccess($lesson);

        if ($canAccess) {
            if (\Auth::check()) {
                if ($lesson->students()->where('id', \Auth::id())->count()
                    == 0
                ) {
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

            $test_exists = false;
            if ($lesson->test && $lesson->test->questions->count() > 0) {
                $test_exists = true;
            }

            return response()->json([
                'lesson'           => $lesson,
                'course'           => $course,
                'test_result'      => $test_result,
                'purchased_course' => $canAccess,
                'test_exists'      => $test_exists
            ]);
        }
        $status = [
            'type'    => 'success',
            'message' => "Oops! Now is a good time to purchase the course"
        ];

        return response()->json($status);
    }

    /**
     * Check if user can access course
     *
     * @param Lesson $lesson
     *
     * @return bool
     */
    public function canAccess(Lesson $lesson)
    {
        $purchased_course = $lesson->course->students()
                ->where('user_id', \Auth::id())->count() > 0;
        if ($purchased_course || $lesson->free_lesson) {
            return true;
        }
        return false;
    }

}
