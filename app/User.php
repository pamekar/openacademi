<?php
namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Contracts\JWTSubject;

/**
 * Class User
 *
 * @package App
 * @property string $name
 * @property string $email
 * @property string $password
 * @property string $remember_token
*/

class User extends \TCG\Voyager\Models\User implements JWTSubject
{
    use Notifiable;
    protected $fillable = ['name', 'email', 'password','categories', 'remember_token','role_id'];

    /**
     * Hash password
     * @param $input
     */
    public function setPasswordAttribute($input)
    {
        if ($input)
            $this->attributes['password'] = app('hash')->needsRehash($input) ? Hash::make($input) : $input;
    }

    public function setRoleIDAttribute(){

    }

    public function isInstructor()
    {
        return $this->hasRole('instructor');
    }

    public function isStudent()
    {
        return $this->hasRole('student');
    }

    public function lessons()
    {
        return $this->belongsToMany('App\Lesson', 'lesson_student');
    }

    public function results()
    {
        return $this->hasMany('App\TestsResult');
    }

    public function payments(){
        return $this->hasMany('App\Payment');
    }

    public function student(){
        return $this->hasOne('App\Student');
    }
    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}
