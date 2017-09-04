var local_url = "start-bitrix-shop";

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs');


//
// Styles
//

gulp.task('styles', function(){
    return gulp.src('_css/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
                browsers: ['last 50 versions'],
            })
        )
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('_css/dist'))
        .pipe(browserSync.stream());
});


//
// JS
//

gulp.task('plugins', function(){
    return gulp.src([
            '_js/jquery.min.js',
            '_js/plugins/**/*.js',
            '!_js/plugins/_not_use__*/*.js'
        ])
        .pipe(concat('plugins.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('_js/dist'));
});

gulp.task('scripts', ['plugins'], function(){
    return gulp.src('_js/scripts/*.js')
        .pipe(concat('common.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('_js/dist'));
});


//
// Browser-sync and watching
//

gulp.task('watch', ['styles', 'scripts'], function(){
    browserSync.init({
        proxy: local_url,
        notify: false,
    });
    
    gulp.watch('_css/*.scss', ['styles']);
    gulp.watch('_js/scripts/*.js', ['scripts']);
    gulp.watch('_js/scripts/*.js', browserSync.reload);
    gulp.watch('*.php', browserSync.reload);
    gulp.watch('*.html', browserSync.reload);
    
});

gulp.task('default', ['watch']);