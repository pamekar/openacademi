<?php

namespace App;

use GeneaLabs\LaravelModelCaching\Traits\Cachable;
use Illuminate\Database\Eloquent\Model;

class Instructor extends Model
{
    //
    use Cachable;

    protected $appends=[
        'full_name'
    ];
    public function getFullNameAttribute(){
        return "$this->first_name $this->last_name";
    }
}
