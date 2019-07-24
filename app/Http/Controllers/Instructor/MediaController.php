<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use App\Lesson;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Spatie\MediaLibrary\Models\Media;


class MediaController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.auth')->except('destroy');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (!$request->has('model_name') && !$request->has('bucket')) {
            return abort(500);
        }

        $id = $request->input('id');
        try {
            $model = Lesson::find($id);
        } catch (ModelNotFoundException $e) {
            abort(500, 'Model not found');
        }

        $file = $request->file($request->input('file_key'));

        $fileMeta = [];
        try {
            $media = $model->addMedia($file)
                ->toMediaCollection($request->input('bucket'));
            $fileMeta[] = $media;
        } catch (\Exception $e) {
            abort(500, $e->getMessage());
        }

        return response()->json([
            'files'   => $fileMeta,
            'success' => true,
            'error'   => null,
            'url'     => asset('png/uploaded.png')
        ]);
    }

    /**
     * @param Request $request
     * @param         $id
     *
     * @return Media|void
     */
    public function show(Request $request, $id)
    {
        //
        if (!$request->has('i')) {
            return abort(404);
        }
        $lesson = Lesson::find($id);
        $media = $lesson->getMedia('resource_files');
        $i = $request->input('i');

        return $media[$i];
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int                      $id
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        //
        return response()->json([
            'success' => true,
            'error'   => null,
            'url'     => asset('png/deleted.png')
        ]);
    }
}
