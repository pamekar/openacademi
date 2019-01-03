<?php

namespace App\Http\Controllers\Traits;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

trait FileUploadTrait
{

    /**
     * File upload trait used in controllers to upload files
     */
    public function saveFiles(Request $request)
    {
        if (!file_exists(storage_path('app/public/uploads'))) {
            mkdir(storage_path('app/public/uploads'), 0777);
            mkdir(storage_path('app/public/uploads/thumb'), 0777);
        }

        $finalRequest = $request;

        foreach ($request->all() as $key => $value) {
            if ($request->hasFile($key)) {
                if ($request->has($key . '_max_width')
                    && $request->has($key . '_max_height')
                ) {
                    // Check file width
                    $file = $request->file($key);
                    $filename = md5(time() . $file->getClientOriginalName())
                        . '.' . $file->getClientOriginalExtension();
                    $thumbFilename = "public/uploads/thumb/$filename";
                    $filename = "public/uploads/$filename";
                    $image = Image::make($file);

                    Storage::put($thumbFilename,
                        Image::make($file)->resize(50, 50)->stream());
                    /*if (! file_exists(storage_path('app/public/uploads/thumb'))) {
                        mkdir(storage_path('app/public/uploads/thumb'), 0777, true);
                    }*/
                    //Image::make($file)->resize(50, 50)->save(storage_path('app/public/uploads/thumb') . '/' . $filename);

                    $width = $image->width();
                    $height = $image->height();
                    if ($width > $request->{$key . '_max_width'}
                        && $height > $request->{$key . '_max_height'}
                    ) {
                        $image->resize($request->{$key . '_max_width'},
                            $request->{$key . '_max_height'});
                    } elseif ($width > $request->{$key . '_max_width'}) {
                        $image->resize($request->{$key . '_max_width'}, null,
                            function ($constraint) {
                                $constraint->aspectRatio();
                            });
                    } elseif ($height > $request->{$key . '_max_width'}) {
                        $image->resize(null, $request->{$key . '_max_height'},
                            function ($constraint) {
                                $constraint->aspectRatio();
                            });
                    }

                    Storage::put($filename, $image->stream());
                    //$image->save(storage_path('app/public/uploads') . '/' . $filename);

                    $finalRequest
                        = new Request(array_merge($finalRequest->all(),
                        [
                            $key                => $filename,
                            $key . "_thumbnail" => $thumbFilename
                        ]));

                } else {
                    $filename = time() . '-' . $request->file($key)
                            ->getClientOriginalName();
                    $request->file($key)
                        ->move(storage_path('app/public/uploads'), $filename);
                    $finalRequest
                        = new Request(array_merge($finalRequest->all(),
                        [$key => $filename]));
                }
            }
        }

        return $finalRequest;
    }
}