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

        $public = config('app.env') == 'production' ? '/main/public' : '';

        $categories = CourseCategory::select('id', 'title', 'icon', 'slug')
            ->get();

        $colors = [
            '2ebd59',
            'fb868f',
            '00dcea',
            '005eea',
            '1cd566',
            '37adff',
            '3b42ff',
            'ec5252',
            'ff562f',
            'ffbf13',
            '536dfe',
            '0dacff',
            '8828ff'
        ];

        $background = [
            '536dfe',
            'fe5367',
            '7ffe53'
        ];

        View::share([
            'categories' => $categories,
            'public'     => $public,
            'colors'     => $colors,
            'background' => $background

        ]);

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