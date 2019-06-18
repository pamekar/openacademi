<?php

namespace App;

use GeneaLabs\LaravelModelCaching\Traits\Cachable;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Role
 *
 * @package App
 * @property string $title
 */
class Role extends Model
{
    use Cachable;
    protected $fillable = ['title'];
    protected $perPage = 25;

    public function permission()
    {
        return $this->belongsToMany(Permission::class, 'permission_role');
    }

}
