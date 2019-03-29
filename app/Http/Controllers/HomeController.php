<?php

namespace App\Http\Controllers;

use App\Course;
use App\CourseCategory;

class HomeController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $purchased_courses = null;
        if (\Auth::check()) {
            $purchased_courses = Course::whereHas('students',
                function ($query) {
                    $query->where('id', \Auth::id());
                })
                ->with('lessons')->with('course_category')
                ->orderBy('id', 'desc')
                ->get();
        }

        $categories = CourseCategory::select('id', 'title','icon')->get();

        $courses = Course::where('published', 1)
            ->orderBy('created_at', 'desc')->inRandomOrder()->limit(8)->get();

        return view('index',
            compact('courses', 'purchased_courses', 'categories'));
    }

    public function faq()
    {
        return view('faq');
    }
}
