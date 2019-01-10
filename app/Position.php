<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Role
 *
 * @package App
 * @property string $title
*/
class Position extends Model
{
    protected $fillable = ['title'];
    
    
    public function permission()
    {
        return $this->belongsToMany(Authorization::class, 'authorization_position');
    }
    
}
