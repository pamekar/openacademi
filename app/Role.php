<?php

namespace App;


use Illuminate\Database\Eloquent\Model;

/**
 * Class Role
 *
 * @package App
 * @property string $title
 */
class Role extends Model
{

    protected $fillable = ['title'];
    protected $perPage = 25;

    public function permission()
    {
        return $this->belongsToMany(Permission::class, 'permission_role');
    }

}
