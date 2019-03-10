<?php
namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

/**
 * Class Question
 *
 * @package App
 * @property text $question
 * @property string $question_image
 * @property integer $score
*/
class Question extends Model
{
    use SoftDeletes;

    protected $fillable = ['question', 'question_image', 'score'];

    protected $appends=['options'];

    /**
     * Set attribute to money format
     * @param $input
     */
    public function setScoreAttribute($input)
    {
        $this->attributes['score'] = $input ? $input : null;
    }

    public function getOptionsAttribute(){
        return $this->tests();
    }

    public function getAnswerAttribute(){
        return "";
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
