<?php

namespace App;


use GeneaLabs\LaravelModelCaching\Traits\Cachable;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Laravel\Scout\Searchable;
use phpDocumentor\Reflection\Types\Boolean;
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
    use SoftDeletes, Searchable;

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
            'course_cat',
            'instructor',
            'last_updated'
        ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts
        = [
            'published' => 'boolean',
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

    public function getInstructorAttribute()
    {
        return Instructor::where('user_id', $this->user_id)->first();
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
        if ($this->course_image_type == 'image' && !empty($value)) {
            return Storage::url($value);
        }
        return $value;
    }

    public function getCourseImagePreviewAttribute($value)
    {
        if (!empty($value)) {
            return Storage::url($value);
        }
        return $value;
    }

    public function getTitleAttribute($title)
    {
        return title_case($title);
    }

    public function getTotalLessonsAttribute()
    {
        $count = Lesson::where('course_id', $this->id)->where('published', 1)
            ->count();

        return $count;
    }

    public function getCompletedLessonsAttribute()
    {
        $count = Auth::user() ? Auth::user()->lessons()
            ->where('course_id', $this->id)
            ->count() : null;
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

    public function getCreatedAtAttribute($input)
    {
        $zeroDate = str_replace(['Y', 'm', 'd'], ['0000', '00', '00'],
            config('app.date_format'));

        if ($input != $zeroDate && $input != null) {
            return date(config('app.date_format'), strtotime($input));
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

    public function isPublished()
    {
        return boolval($this->published);
    }

    public function shouldBeSearchable()
    {
        return $this->isPublished();
    }

    /**
     * Get the indexable data array for the model.
     *
     * @return array
     */
    public function toSearchableArray()
    {
        $array = $this->toArray();

        $search = Arr::only($array, [
            'id',
            'title',
            'slug',
            'tags',
            'summary',
            'description',
        ]);
        $searchable = array_replace($search, [
            'id'          => $this->id,
            'title'       => $this->title,
            'slug'        => $this->slug,
            'tags'        => implode(";",$this->tags),
            'summary'     => $this->summary,
            'description' => $this->description,
            'category'    => $this->course_cat,
            'instructor' =>$this->instructor->full_name
        ]);

        return $searchable;
    }
}
