var elixir = require('laravel-elixir');
require('laravel-elixir-angular');

var gulp = require('gulp');
var browserify = require('gulp-browserify');
var istanbul = require('browserify-istanbul');
var isparta  = require('isparta');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var notify = require('gulp-notify');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir.extend('js', function(src) {

    var baseDir = src || this.assetsDir + 'js/';

    gulp.task('js in ' + baseDir, function() {
        // Module inits have to be included first.


        return gulp.src(baseDir + "app.module.js")
            .pipe(browserify({
                debug: true,
                transform: [
                    'bulkify',
                    istanbul({
                        instrumenter: isparta,
                        ignore: ['**/node_modules/**', baseDir+ 'tests/**']
                    }),
                ]
            }))
            .pipe(concat('main.js'))
            .pipe(ngAnnotate())
            .pipe(gulp.dest('public/build/js'))
            .pipe(notify({
                title: 'Laravel Elixir',
                subtitle: 'JS !',
                icon: 'node_modules/laravel-elixir/icons/laravel.png',
                message: 'Javascript files has been compiled'
            }));
    });

    this.registerWatcher('js in ' + baseDir, baseDir + '/**/*.js');

    return this.queueTask('js in ' + baseDir);

});

elixir.extend('views', function(src) {
    var baseDir = src || this.assetsDir + 'templates/';
    gulp.task('templates in ' + baseDir, function() {
        return gulp.src(baseDir + "**/*.html")
            // And put it in the dist folder
            .pipe(gulp.dest('public/build/views'))
            .pipe(notify({
                title: 'Laravel Elixir',
                subtitle: 'Templates !',
                icon: 'node_modules/laravel-elixir/icons/laravel.png',
                message: 'Templates files has been copied'
            }));
    });

    this.registerWatcher('templates in ' + baseDir, baseDir + '*.html');

    return this.queueTask('templates in ' + baseDir);
});

elixir.config.registerWatcher("default", "resources/assets/views/**");

elixir(function(mix) {
    mix.sass('app.scss');
    mix.js("resources/assets/js/");
    mix.views("resources/assets/views/");
});
