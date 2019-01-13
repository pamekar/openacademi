<?php

namespace App\Http\Controllers\Api;

use App\Course;
use App\CourseCategory;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Facades\JWTAuth;

class HomeController extends Controller
{
    protected $user;

    public function __construct()
    {
        $this->user =JWTAuth::parseToken()->toUser();
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $my_courses = null;
        $my_courses = Course::whereHas('students',
            function ($query) {
                $query->where('id', $this->user->id);
            })
            ->orderBy('id', 'desc')
            ->get();

     /*   $courses = Course::where('published', 1)
            ->orderBy('created_at', 'desc')->inRandomOrder()->limit(10)->get();*/

     return response()->json(['my_courses'=>$my_courses]);
    }

    public function faq()
    {
        return view('faq');
    }
}
