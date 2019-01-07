<?php

namespace App\Providers;

use App\CourseCategory;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);


        $public = config('app.env') == 'production' ? '/public' : '';


        $categories = CourseCategory::select('id', 'title', 'icon', 'slug')
            ->get();

        View::share(['categories' => $categories, 'public'=> $public]);

    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
        /**
         * Added missing method for package to work
         */
        \Illuminate\Support\Collection::macro('lists',
            function ($a, $b = null) {
                return collect($this->items)->pluck($a, $b);
            });

    }
}
