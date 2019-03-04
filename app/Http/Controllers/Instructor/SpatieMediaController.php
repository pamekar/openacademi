<?php

namespace App\Http\Controllers\Instructor;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SpatieMediaController extends Controller
{
    /**
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request)
    {
        if (!$request->has('model_name') && !$request->has('bucket')) {
            return abort(500);
        }

        $model = 'App\\' . $request->input('model_name');
        try {
            $model = new $model();
        } catch (ModelNotFoundException $e) {
            abort(500, 'Model not found');
        }

        $file = $request->file($request->input('file_key'));
        $fileMeta=[];
        try {
            $media = $model->addMedia($file)
                ->toMediaLibrary($request->input('bucket'));
            $fileMeta[] = $media;
        } catch (\Exception $e) {
            abort(500,$e->getMessage());
        }


        return response()->json(['files' => $fileMeta,'success'=>true,'error'=>null,'url'=>null]);
    }
}
