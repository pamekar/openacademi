<?php

namespace App;

use GeneaLabs\LaravelModelCaching\Traits\Cachable;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Permission
 *
 * @package App
 * @property string $title
 */
class Permission extends Model
{
    use Cachable;

    protected $fillable = ['title'];
    protected $perPage = 25;

}
