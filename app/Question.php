<?php

namespace App;

use GeneaLabs\LaravelModelCaching\Traits\Cachable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

/**
 * Class Question
 *
 * @package App
 * @property text    $question
 * @property string  $question_image
 * @property integer $score
 */
class Question extends Model
{
    use SoftDeletes, Cachable;

    protected $fillable = ['question', 'question_image', 'score'];

    protected $appends = ['answer'];

    /**
     * Set attribute to money format
     *
     * @param $input
     */
    public function setScoreAttribute($input)
    {
        $this->attributes['score'] = $input ? $input : null;
    }

    public function getAnswerAttribute()
    {
        $results = TestsResult::where('user_id', Auth::id())->where('status','active')->pluck('id');

        $answer = TestsResultsAnswer::whereIn('tests_result_id', $results)
            ->where('question_id', $this->id)->latest()->first();
        $value = !$answer
            ?: ($answer->answer_type === 'radio' ? $answer->option_id
                : $answer->answer_text);
        return $answer ? $value : null;
    }

    public function options()
    {
        return $this->hasMany('App\QuestionsOption');
    }

    public function tests()
    {
        return $this->belongsToMany(Test::class, 'question_test');
    }

    public function getQuestionImageAttribute($value)
    {
        if (!empty($value)) {
            return Storage::url($value);
        }
        return $value;
    }

    public function setLessonImageAttribute($image)
    {
        $this->attributes['lesson_image'] = str_replace('/storage/',
            'public/', $image);
    }
}
