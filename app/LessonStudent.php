<?php

namespace App;

use GeneaLabs\LaravelModelCaching\Traits\Cachable;
use Illuminate\Database\Eloquent\Model;

class LessonStudent extends Model
{
    //
    use Cachable;
    protected $table='lesson_student';
}
