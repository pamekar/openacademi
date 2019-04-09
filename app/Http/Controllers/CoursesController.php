<?php

namespace App\Http\Controllers;

use App\Course;
use App\CourseCategory;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Charge;
use Stripe\Customer;

class CoursesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->only(['payment','rating']);
    }

    public function index($category = null)
    {
        $isCategory = $category ? CourseCategory::where('slug', $category)
            ->orWhere('id', $category)
            ->first() : false;

        return view('courses',
            compact('isCategory'));
    }

    public function getAllCourses($category = null, Request $request)
    {
        $count = $request->input('count', 12);
        $isCategory = CourseCategory::where('slug', $category)
            ->orWhere('id', $category)->first();
        $courses = [];
        if (isset($category)) {

            if ($isCategory) {
                $courses = Course::where('published', 1)
                    ->where('category', $isCategory->id)->orderBy('id', 'desc')
                    ->paginate($count);
            } else {
                abort(404);
            }
        } else {
            $courses = Course::where('published', 1)->orderBy('id', 'desc')
                ->paginate($count);
        }


        return response()->json($courses);
    }


    public function search(Request $request)
    {
        return view('search',['search'=>$request->q]);
    }

    public function searchCourses(Request $request)
    {
        $search = explode(',', $request->input('q', []));
        $count = $request->input('count', 12);


        $courses = Course::where('published', 1)->where(function ($query) use (
            $search
        ) {
            foreach ($search as $item) {
                $query->where('tags', 'like', "%$item%")
                    ->orWhere('title', 'like', "%$item%");
            }
        })
            ->paginate($count);

        return response()->json([
            'courses' => $courses,
            'search'  => $request->input('q', [])
        ]);
    }

    public function show($course_slug)
    {
        $course = Course::where('slug', $course_slug)->with('publishedLessons')
            ->firstOrFail();
        $featuredCourses = Course::where('category', $course->category)
            ->inRandomOrder()->limit(3)->get();
        $purchased_course = \Auth::check()
            && $course->students()->where('user_id', \Auth::id())->count() > 0;


        return view('course',
            compact('course', 'purchased_course', 'featuredCourses'));
    }

    public function payment($course_id)
    {
        $course = Course::findOrFail($course_id);
        $course->students()->attach(\Auth::id());

        //$this->createStripeCharge($request);
        //return redirect()->back()->with('success', 'Payment completed successfully.');
    }

    private function createStripeCharge($request)
    {
        Stripe::setApiKey(env('STRIPE_API_KEY'));

        try {
            $customer = Customer::create([
                'email' => $request->get('stripeEmail'),
                'source' => $request->get('stripeToken')
            ]);

            $charge = Charge::create([
                'customer' => $customer->id,
                'amount'   => $request->get('amount'),
                'currency' => "usd"
            ]);
        } catch (\Stripe\Error\Base $e) {
            return redirect()->back()->withError($e->getMessage())->send();
        }
    }

    public function rating($course_id, Request $request)
    {
        $course = Course::findOrFail($course_id);
        $course->students()->updateExistingPivot(\Auth::id(),
            ['rating' => $request->get('rating')]);

        return redirect()->back()->with('success', 'Thank you for rating.');
    }

}
