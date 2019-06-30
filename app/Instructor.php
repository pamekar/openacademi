<?php

namespace App;


use Illuminate\Database\Eloquent\Model;

class Instructor extends Model
{
    //
    protected $appends=[
        'full_name'
    ];
    public function getFullNameAttribute(){
        return "$this->first_name $this->last_name";
    }
}
