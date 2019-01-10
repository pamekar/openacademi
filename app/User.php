<?php
namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;

/**
 * Class User
 *
 * @package App
 * @property string $name
 * @property string $email
 * @property string $password
 * @property string $remember_token
*/
class User extends \TCG\Voyager\Models\User
{
    use Notifiable;
    protected $fillable = ['name', 'email', 'password','categories', 'remember_token'];
    
    
    /**
     * Hash password
     * @param $input
     */
    public function setPasswordAttribute($input)
    {
        if ($input)
            $this->attributes['password'] = app('hash')->needsRehash($input) ? Hash::make($input) : $input;
    }
    
    
    public function position()
    {
        return $this->belongsToMany(Position::class, 'position_user');
    }


    public function isAdmin()
    {
        return $this->position()->where('role_id', 1)->first();
    }

    public function lessons()
    {
        return $this->belongsToMany('App\Lesson', 'lesson_student');
    }

}
