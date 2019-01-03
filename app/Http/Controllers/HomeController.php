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
                ->with('lessons')
                ->orderBy('id', 'desc')
                ->get();
        }

        $courses = Course::where('published', 1)
            ->orderBy('created_at', 'desc')->get();


        $categories = CourseCategory::select('id', 'title')->get();
        return view('index',
            compact('courses', 'purchased_courses', 'categories'));
    }

    public function faq()
    {
        $categories = CourseCategory::select('id', 'title')->get();
        return view('faq', compact('categories'));
    }
}
