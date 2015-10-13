var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var browserSync = require('browser-sync').create();
var wiredep = require('wiredep').stream;
var connect = require('gulp-connect');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');


gulp.task('default', ['styles', 'watch', 'serve']);


gulp.task('styles', function(){
    return gulp.src('./app/styles/*.scss')
               .pipe(sass())
                .pipe(concat('app.css'))
               .pipe(gulp.dest('./app/styles'))
               .pipe(browserSync.stream());
});



gulp.task('html', function(){
    var options = {comments:false,spare:true};
    var assets = useref.assets();
    return gulp.src('src/*.html')
            .pipe(assets)
            // .pipe(minifyHTML(options))
            .pipe(gulpif('*.js', uglify()))
            .pipe(gulpif('*.css', minify()))
            .pipe(assets.restore())
            .pipe(useref())
            .pipe(gulp.dest('./dist'))
            .pipe(browserSync.stream());
});

gulp.task('watch', function(){
        gulp.watch('app/js/**/*.js', ['scripts']);
        gulp.watch('app/styles/**/*.scss', ['styles']).on('change', browserSync.reload);
        gulp.watch('app/*.html', []).on('change', browserSync.reload);
});

gulp.task('bower', function () {
    gulp.src('app/index.html')
        .pipe(wiredep())
        .pipe(gulp.dest('./app'));
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });
});


