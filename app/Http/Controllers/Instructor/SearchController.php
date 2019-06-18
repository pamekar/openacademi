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
        $search = explode(',', $request->input('q', []));
        $count = $request->input('count', 12);
        $category = $request->input('category', null);
        $courses = Course::where('published', 1)->where(function ($query) use (
            $search,
            $category
        ) {
            foreach ($search as $item) {
                $query->where('tags', 'like', "%$item%")
                    ->orWhere('summary', 'like', "%$item%")
                    ->orWhere('summary', 'like', "%$item%")
                    ->orWhere('title', 'like', "%$item%");
            }
        })->where(function ($query) use ($category) {
            if ($category) {
                $query->where('category', $category);
            }
        })
            ->paginate($count);

        return response()->json([
            'courses' => $courses,
            'search'  => $request->input('q', [])
        ]);
    }
}
