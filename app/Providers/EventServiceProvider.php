<?php

namespace App\Providers;

use Illuminate\Support\Facades\Event;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        'App\Events\Event' => [
            'App\Listeners\EventListener',
        ],
        'tymon.jwt.valid' => [
            'App\Events\JWTEvents@valid',
        ],
        'tymon.jwt.user_not_found' => [
            'App\Events\JWTEvents@notFound'
        ],
        'tymon.jwt.invalid' => [
            'App\Events\JWTEvents@invalid'
        ],
        'tymon.jwt.expired' => [
            'App\Events\JWTEvents@expired'
        ],
        'tymon.jwt.absent' => [
            'App\Events\JWTEvents@missing'
        ]
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}
