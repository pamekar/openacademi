<?php

namespace App;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\HasMedia\Interfaces\HasMedia;

/**
 * Class Lesson
 *
 * @package App
 * @property string      $course
 * @property string      $title
 * @property string      $slug
 * @property string      $lesson_image
 * @property text        $short_text
 * @property text        $full_text
 * @property integer     $position
 * @property string      $downloadable_files
 * @property tinyInteger $free_lesson
 * @property tinyInteger $published
 */
class Lesson extends Model implements HasMedia
{
    use SoftDeletes, HasMediaTrait;

    protected $fillable
        = [
            'user_id',
            'title',
            'slug',
            'lesson_image',
            'short_text',
            'full_text',
            'position',
            'downloadable_files',
            'free_lesson',
            'lesson_image_type',
            'lesson_image_preview',
            'published',
            'course_id',
            'duration'
        ];
    protected $appends
        = [
            'is_completed',
            'last_updated',
            'downloadable_files_id'
        ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts
        = [
            'published' => 'boolean',
            'free_lesson' => 'boolean',
        ];

    public function getCourseTitleAttribute()
    {
        return title_case(Course::findOrFail($this->course_id)->title);
    }

    public function getDownloadableFilesIdAttribute()
    {
        $downloadables = $this->getMedia('downloadable_files');
        $fileIds = [];
        foreach ($downloadables as $downloadable) {
            array_push($fileIds, $downloadable->id);
        }
        return $fileIds;
    }

    public function getIsCompletedAttribute()
    {
        $isCompleted = Auth::user()->lessons()->where('lesson_id', $this->id)
            ->count();
        return $isCompleted;
    }

    public function getLessonImageAttribute($value)
    {
        if ($this->lesson_image_type == 'image' && !empty($value)) {
            return Storage::url($value);
        }
        return $value;
    }

    public function getLessonImagePreviewAttribute($value)
    {
        if (!empty($value)) {
            return Storage::url($value);
        }
        return $value;
    }

    /**
     * Set to null if empty
     *
     * @param $input
     */
    public function setCourseIdAttribute($input)
    {
        $this->attributes['course_id'] = $input ? $input : null;
    }

    public function setLessonImageAttribute($image)
    {
        $this->attributes['lesson_image'] = str_replace('/storage/',
            'public/', $image);
    }

    public function setLessonImagePreviewAttribute($image)
    {
        $this->attributes['lesson_image_preview'] = str_replace('/storage/',
            'public/', $image);
    }

    /**
     * Set attribute to money format
     *
     * @param $input
     */
    public function setPositionAttribute($input)
    {
        $this->attributes['position'] = $input ? $input : null;
    }

    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id')->withTrashed();
    }

    public function getTitleAttribute($title)
    {
        return title_case($title);
    }

    public function test()
    {
        return $this->hasOne('App\Test');
    }

    public function students()
    {
        return $this->belongsToMany('App\User', 'lesson_student')
            ->withTimestamps();
    }

    function getLastUpdatedAttribute()
    {
        $now = new \DateTime();
        $ago = new \DateTime($this->updated_at);
        $diff = $now->diff($ago);

        $diff->w = floor($diff->d / 7);
        $diff->d -= $diff->w * 7;

        $string = array(
            'y' => 'year',
            'm' => 'month',
            'w' => 'week',
            'd' => 'day',
            'h' => 'hour',
            'i' => 'minute',
            's' => 'second',
        );
        foreach ($string as $k => &$v) {
            if ($diff->$k) {
                $v = $diff->$k . ' ' . $v . ($diff->$k > 1 ? 's' : '');
            } else {
                unset($string[$k]);
            }
        }

        //  if (!$full)
        $string = array_slice($string, 0, 1);
        return $string ? implode(', ', $string) . ' ago' : 'just now';
    }

}
