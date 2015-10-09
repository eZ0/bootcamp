var gulp = require('gulp');

var sass = require('gulp-sass');
var minify = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var minifyHTML = require('gulp-minify-html');

var browserSync = require('browser-sync').create();
var wiredep = require('wiredep').stream;


gulp.task('default', function(){
    gulp.start('styles', 'scripts', 'html');
});

gulp.task('styles', function(){
    return gulp.src('src/sass/app.scss')
               .pipe(sourcemaps.init({loadMaps: true}))
               .pipe(sass())
               .pipe(minify())
               .pipe(sourcemaps.write('./'))
               .pipe(gulp.dest('./dist/styles'));
});

gulp.task('scripts', function(){
    return gulp.src('src/js/**/*.js')
               .pipe(concat('app.js'))
               .pipe(uglify())
               .pipe(gulp.dest('./dist/scripts'))
});

gulp.task('html', function(){
    gulp.start('bower');
    var options = {comments:true,spare:true};
    return gulp.src('src/*.html')
            .pipe(minifyHTML(options))
            .pipe(gulp.dest('./dist/'))
});

gulp.task('watch', function(){
        gulp.watch('src/js/**/*.js', ['scripts']);
        gulp.watch('src/sass/**/*.scss', ['styles']);
        gulp.watch('src/*.html', ['html']);
});

gulp.task('bower', function () {
    gulp.src('src/index.html')
        .pipe(wiredep())
        .pipe(gulp.dest('./dist'));
});


