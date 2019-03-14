<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Test
 *
 * @package App
 * @property string      $course
 * @property string      $lesson
 * @property string      $title
 * @property text        $description
 * @property tinyInteger $published
 */
class Test extends Model
{
    use SoftDeletes;

    protected $fillable
        = [
            'title',
            'description',
            'published',
            'course_id',
            'lesson_id',
            'about_quiz',
            'duration',
            'user_id'
        ];

    protected $appends = ['lesson_title', 'course_title', 'completed_count','instructions'];

    /**
     * Set to null if empty
     *
     * @param $input
     */
    public function setCourseIdAttribute($input)
    {
        $this->attributes['course_id'] = $input ? $input : null;
    }

    /**
     * Set to null if empty
     *
     * @param $input
     */
    public function setLessonIdAttribute($input)
    {
        $this->attributes['lesson_id'] = $input ? $input : null;
    }

    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id')->withTrashed();
    }

    public function getCourseTitleAttribute()
    {
        return title_case($this->course->title);
    }

    public function getLessonTitleAttribute()
    {
        return title_case($this->lesson->title);
    }

    public function getCompletedCountAttribute()
    {
        $count = TestsResult::where('test_id', $this->id)
            ->count();
        return $count;
    }

    public function getInstructionsAttribute(){
        return setting('site.quiz_instructions');
    }

    public function getTitleAttribute($title)
    {
        return title_case($title);
    }

    public function lesson()
    {
        return $this->belongsTo(Lesson::class, 'lesson_id')->withTrashed();
    }

    public function questions()
    {
        return $this->belongsToMany(Question::class, 'question_test')
            ->withTrashed();
    }

    public function results()
    {
        return $this->hasMany('App\TestsResult')->orderBy('updated_at', 'asc');
    }

    public function setPublishedAttribute($value)
    {
        $this->attributes['published'] = $value == 'true' || $value == 1 ? 1
            : 0;
    }

}
