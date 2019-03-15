<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TestsResult extends Model
{
    use SoftDeletes;

    protected $fillable = ['test_id', 'user_id', 'test_result','total_score','status'];

    protected $appends = ['student'];

    public function answers()
    {
        return $this->hasMany('App\TestsResultsAnswer');
    }

    public function test(){
        return $this->belongsTo('App\Test');
    }

    public function getStartDateAttribute($input)
    {
        return date_format(date_create($input),'M jS, Y');
    }

    public function getCreatedAtAttribute($input)
    {
        return date_format(date_create($input),'M jS, Y');
    }

    public function getStudentAttribute()
    {
        return User::findOrFail($this->user_id)->student;
    }

}
