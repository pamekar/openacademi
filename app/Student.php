<?php

namespace App;

use GeneaLabs\LaravelModelCaching\Traits\Cachable;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    //
    use Cachable;

    protected $appends=['full_name'];
    /**
     * drg >> Set the full name for requests
     * @param $input
     */
    public function getFullNameAttribute(){
        return "$this->first_name $this->last_name";
    }
}
