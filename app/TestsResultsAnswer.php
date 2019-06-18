<?php

namespace App;

use GeneaLabs\LaravelModelCaching\Traits\Cachable;
use Illuminate\Database\Eloquent\Model;

class TestsResultsAnswer extends Model
{
    use Cachable;

    protected $fillable = ['tests_result_id', 'question_id', 'option_id', 'correct','answer_text','answer_type'];

    public function question(){
        return $this->belongsTo('App\Question');
    }

    public function review(){
        return $this->hasOne('App\TestsResultsAnswersReview');
    }

}
