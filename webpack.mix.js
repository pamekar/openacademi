const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/student/app.js', 'public/student/js')
    .sass('resources/sass/student/app.scss', 'public/student/css');
mix.js('resources/js/instructor/app.js', 'public/instructor/js')
    .sass('resources/sass/instructor/app.scss', 'public/instructor/css');

