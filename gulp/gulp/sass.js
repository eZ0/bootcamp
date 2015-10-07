'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function(){
    browserSyncinit({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("./styles/*.scss", ['sass']);
    gulp.watch("./*.html").on('change', browserSync.load());

});

gulp.task('sass', function(){

    return gulp.src('./styles/*.scss')
                .pipe(sourcemaps.init({loadMaps: true}))
               .pipe(sass())
               .pipe(sourcemaps.write('./'))
               .pipe(gulp.dest('./styles'))
               .pipe(browserSync.sream);
});
