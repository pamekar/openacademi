const mix = require('laravel-mix');
require('laravel-mix-purgecss');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |e
 */

/* Vue Js resources*/
mix.js('resources/js/home/app.js', 'public/js');
mix.js('resources/js/student/app.js', 'public/student/js');
mix.js('resources/js/teacher/app.js', 'public/teacher/js');

/* Styles for LMS user views*/
mix.styles([
    'public/assets/vendor/perfect-scrollbar.css',
    'public/assets/css/material-icons.css',
    'public/assets/css/fontawesome.css',
    'public/assets/css/app.css',
    'public/assets/css/nestable.css'
], 'public/assets/css/academi-styles.css').purgeCss();

/* Instructor's scripts before app.js*/
mix.scripts([
    'public/assets/vendor/jquery.min.js',
    'public/assets/vendor/popper.min.js',
    'public/assets/vendor/bootstrap.min.js',
], 'public/assets/js/academi-scripts-instructor-1.js');

/* Instructor's scripts after app.js*/
mix.scripts([
    'public/assets/vendor/jquery.nestable.js',
    'public/assets/js/nestable.js',
    'public/assets/vendor/perfect-scrollbar.min.js',
    'public/assets/vendor/dom-factory.js',
    'public/assets/vendor/material-design-kit.js',
    'public/assets/js/app.js',
], 'public/assets/js/academi-scripts-instructor-2.js');

/* Student's scripts before app.js*/
mix.scripts([
    'public/assets/vendor/jquery.min.js',
    'public/assets/vendor/popper.min.js',
    'public/assets/vendor/bootstrap.min.js',
    'public/js/bootstrap-notify.min.js',
], 'public/assets/js/academi-scripts-student-1.js');

/* Student's scripts after app.js*/
mix.scripts([
    'public/assets/vendor/perfect-scrollbar.min.js',
    'public/assets/vendor/dom-factory.js',
    'public/assets/vendor/material-design-kit.js',
    'public/assets/js/app.js',
    'public/assets/js/moment.js',
    'public/assets/js/jquery.countdown.min.js',
    'public/assets/js/countdown.js',
], 'public/assets/js/academi-scripts-student-2.js');

if (mix.inProduction()) {
    /* Versioning and Cache Busting*/
    mix.version();
}

