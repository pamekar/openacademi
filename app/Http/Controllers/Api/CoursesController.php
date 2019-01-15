<?php

namespace App\Http\Controllers\Api;

use App\Course;
use App\CourseCategory;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Charge;
use Stripe\Customer;
use Tymon\JWTAuth\Facades\JWTAuth;

class CoursesController extends Controller
{
    public function __construct()
    {
        $this->user = JWTAuth::parseToken()->toUser();
    }

    public function index($category = null)
    {

        if (isset($category)) {

            $isCategory = CourseCategory::where('slug', $category)->first();
            if ($isCategory) {
                $courses = Course::where('published', 1)
                    ->where('category', $isCategory->id)->orderBy('id', 'desc')
                    ->get();
            } else {
                abort(404);
            }
        } else {
            $courses = Course::where('published', 1)->orderBy('id', 'desc')
                ->get();
        }


        return view('courses', compact('courses', 'categories'));
    }

    public function getAll(Request $request)
    {
        $isDashboard = $request->dashboard;
        $count = $request->input('count', 8);
        if ($isDashboard) {
            $courses = Course::where('published', 1)->orderBy('id', 'desc')
                ->limit($count)
                ->get();
        }

        return response()->json(['courses' => $courses]);
    }

    public function getPurchased(Request $request)
    {
        $isDashboard = $request->dashboard;
        $count = $request->count;
        if ($isDashboard) {
            $courses = Course::whereHas('students',
                function ($query) {
                    $query->where('id', $this->user->id);
                })
                ->orderBy('updated_at', 'desc')->limit($count)
                ->get();
        } else {
            $courses = Course::whereHas('students',
                function ($query) {
                    $query->where('id', $this->user->id);
                })
                ->orderBy('updated_at', 'desc')
                ->get();
        }

        return response()->json(['courses' => $courses]);
    }

    public function show($course_slug)
    {
        $course = Course::where('slug', $course_slug)->with('publishedLessons')
            ->firstOrFail();
        $purchased_course = \Auth::check()
            && $course->students()->where('user_id', \Auth::id())->count() > 0;

        return view('course', compact('course', 'purchased_course'));
    }

    public function payment(Request $request)
    {
        $course = Course::findOrFail($request->get('course_id'));
        $this->createStripeCharge($request);

        $course->students()->attach(\Auth::id());

        return redirect()->back()
            ->with('success', 'Payment completed successfully.');
    }

    private function createStripeCharge($request)
    {
        Stripe::setApiKey(env('STRIPE_API_KEY'));

        try {
            $customer = Customer::create([
                'email'  => $request->get('stripeEmail'),
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
