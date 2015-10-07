var gulp = require('gulp');
// var sass = require('gulp-sass');
// var connect = require('gulp-connect');
var runSequence = require('run-sequence');
var wiredep = require('wiredep').stream;
var useref = require('gulp-useref');
var minify = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
// var sourcemaps = require('gulp-sourcemaps');
var eslint = require('gulp-eslint');
var requireDir = require('require-dir');

// gulp.task('sass', function(){

//     return gulp.src('./styles/*.scss')
//                 .pipe(sourcemaps.init({loadMaps: true}))
//                .pipe(sass())
//                .pipe(sourcemaps.write('./'))
//                .pipe(gulp.dest('./styles'));
// });

gulp.task('lint', function(){

    return gulp.src(['./scripts/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());

});


gulp.task('html', function(){

    var assets = useref.assets();

    return gulp.src('./*.html')
               .pipe(assets)
               .pipe(gulpif('*.js', uglify()))
               .pipe(gulpif('*.css', minify()))
               .pipe(assets.restore())
               .pipe(useref())
               .pipe(gulp.dest('./dist'));
});

gulp.task('bower', function () {
    gulp.src('./index.html')
        .pipe(wiredep())
        .pipe(gulp.dest('./'));
});

gulp.task('watch', function(){
    gulp.watch(['**/*.html'], ['reload']);
    gulp.watch(['**/*.scss'], function(){
            runSequence('sass','reload')
        });
});

gulp.task('reload', function(){
    return gulp.src('.')
               .pipe(connect.reload());
});

// gulp.task('connect', function(){
//     connect.server({
//         livereload: true
//     });
// });

// Require all tasks in the 'gulp' folder.

requireDir('./gulp', { recurse: false });

gulp.task('default', ['sass', 'connect', 'watch']);
