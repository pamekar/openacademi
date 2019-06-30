<?php

namespace App;


use Illuminate\Database\Eloquent\Model;

class TestsResultsAnswersReview extends Model
{
    //


    protected $fillable
        = [
            'tests_results_answer_id',
            'review',
            'score'
        ];

}
