<?php

namespace App\Http\Controllers\Instructor;

use App\Course;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SearchController extends Controller
{
    //
    public function index(Request $request)
    {
        $course = Course::search($request->input('q', '*'))->get();
        return response()->json($course);
    }
}
