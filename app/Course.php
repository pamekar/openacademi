<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Tymon\JWTAuth\Facades\JWTAuth;

/**
 * Class Course
 *
 * @package App
 * @property string      $title
 * @property string      $slug
 * @property text        $description
 * @property decimal     $price
 * @property string      $course_image
 * @property string      $start_date
 * @property tinyInteger $published
 */
class Course extends Model
{
    use SoftDeletes;


    protected $fillable
        = [
            'user_id',
            'title',
            'slug',
            'description',
            'category',
            'tags',
            'summary',
            'price',
            'course_image',
            'course_image_type',
            'course_image_preview',
            'start_date',
            'end_date',
            'published'
        ];

    protected $appends
        = [
            'total_lessons',
            'completed_lessons',
            'rating',
            'course_cat'
        ];

    /**
     * Set attribute to money format
     *
     * @param $input
     */
    public function setPriceAttribute($input)
    {
        $this->attributes['price'] = $input ? $input * 100 : null;
    }

    public function getTagsAttribute($tags)
    {
        return explode(';', $tags);
    }

    public function course_category()
    {
        return $this->belongsTo('App\CourseCategory', 'category');
    }

    public function getCourseCatAttribute()
    {

        return $this->course_category->title;
    }

    /**
     * Set attribute to date format
     *
     * @param $input
     */
    public function setStartDateAttribute($input)
    {
        if ($input != null && $input != '') {
            $this->attributes['start_date']
                = Carbon::createFromFormat(config('app.date_format'), $input)
                ->format('Y-m-d');
        } else {
            $this->attributes['start_date'] = null;
        }
    }

    public function setCourseImageAttribute($image)
    {
        $this->attributes['course_image'] = str_replace('/storage/',
            'public/', $image);
    }

    public function setCourseImagePreviewAttribute($image)
    {
        $this->attributes['course_image_preview'] = str_replace('/storage/',
            'public/', $image);
    }

    public function getCourseImageAttribute($value)
    {
        if ( !empty($value) ) {
            return Storage::url($value);
        }
        return $value;
    }

    public function getCourseImagePreviewAttribute($value)
    {
        if ( !empty($value) ) {
            return Storage::url($value);
        }
        return $value;
    }


    public function getTotalLessonsAttribute()
    {
        $count = Lesson::where('course_id', $this->id)->where('published', 1)
            ->count();

        return $count;
    }

    public function getCompletedLessonsAttribute()
    {
        $count = Auth::user()->lessons()->where('course_id', $this->id)
            ->count();
        return $count;
    }

    public function getDurationAttribute()
    {
        $duration = Lesson::where('course_id', $this->id)->where('published', 1)
            ->sum('duration');
        return $duration;
    }

    /**
     * Get attribute from date format
     *
     * @param $input
     *
     * @return string
     */
    public function getStartDateAttribute($input)
    {
        $zeroDate = str_replace(['Y', 'm', 'd'], ['0000', '00', '00'],
            config('app.date_format'));

        if ($input != $zeroDate && $input != null) {
            return Carbon::createFromFormat('Y-m-d', $input)
                ->format(config('app.date_format'));
        } else {
            return '';
        }
    }

    /**
     * Get attribute from date format
     *
     * @param $input
     *
     * @return string
     */
    public function getEndDateAttribute($input)
    {
        $zeroDate = str_replace(['Y', 'm', 'd'], ['0000', '00', '00'],
            config('app.date_format'));

        if ($input != $zeroDate && $input != null) {
            return Carbon::createFromFormat('Y-m-d', $input)
                ->format(config('app.date_format'));
        } else {
            return '';
        }
    }

    public function teachers()
    {
        return $this->belongsToMany(User::class, 'course_user');
    }

    public function students()
    {
        return $this->belongsToMany(User::class, 'course_student')
            ->withTimestamps()->withPivot(['rating']);
    }

    public function lessons()
    {
        return $this->hasMany(Lesson::class)->orderBy('position');
    }

    public function publishedLessons()
    {
        return $this->hasMany(Lesson::class)->orderBy('position')
            ->where('published', 1);
    }

    public function scopeOfTeacher($query)
    {
        if (Auth::user()->isInstructor()) {
            return $query->whereHas('teachers', function ($q) {
                $q->where('user_id', Auth::user()->id);
            });
        }
        return $query;
    }

    public function getPriceAttribute($price)
    {
        return $price / 100;
    }

    public function getRatingAttribute()
    {
        $ratings = DB::table('course_student')
            ->where('course_id', $this->id)->where('rating', '>', 0)
            ->pluck('rating')->toArray();

        $count = count($ratings);
        $sum = array_sum($ratings);
        $average = $count !== 0 && $sum !== 0 ? number_format($sum / $count, 2)
            : 0;
        return "$average;$count";

    }

    public function setPublishedAttribute($value)
    {
        return $value ? 1 : 0;
    }
}
