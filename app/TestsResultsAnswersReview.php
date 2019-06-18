<?php

namespace App;

use GeneaLabs\LaravelModelCaching\Traits\Cachable;
use Illuminate\Database\Eloquent\Model;

class TestsResultsAnswersReview extends Model
{
    //
    use Cachable;

    protected $fillable
        = [
            'tests_results_answer_id',
            'review',
            'score'
        ];

}
