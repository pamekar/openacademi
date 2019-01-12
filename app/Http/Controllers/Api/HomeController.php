<?php

namespace App\Http\Controllers;

use App\Course;
use App\CourseCategory;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Auth;

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

        $auth = new AuthController();
        $auth->me();
        $purchased_courses = Course::whereHas('students',
            function ($query) {
                $query->where('id', Auth::id());
            })
            ->with('lessons')
            ->orderBy('id', 'desc')
            ->get();

        $categories = CourseCategory::select('id', 'title')->get();

        $courses = Course::where('published', 1)
            ->orderBy('created_at', 'desc')->inRandomOrder()->limit(10)->get();

        return view('index',
            compact('courses', 'purchased_courses', 'categories'));
    }

    public function faq()
    {
        return view('faq');
    }
}
