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
var Server = require('karma').Server;
var useref = require('gulp-useref');
var gulpif = require('gulp-if');


gulp.task('default', ['styles', 'watch', 'serve', 'test']);
gulp.task('build', ['scripts', 'html', 'styles-dist']);

gulp.task('styles', function(){
    return gulp.src('./src/styles/*.scss')
               .pipe(sass())
                .pipe(concat('app.css'))
               .pipe(gulp.dest('./src/styles'))
               .pipe(browserSync.stream());
});

gulp.task('styles-dist', function(){
    return gulp.src('./src/styles/*.scss')
               .pipe(sourcemaps.init({loadMaps: true}))
               .pipe(sass())
               .pipe(concat('app.css'))
               .pipe(sourcemaps.write('./'))
               .pipe(gulp.dest('./dist/styles'));
});

gulp.task('scripts', function(){
    return gulp.src('src/scripts/**/*.js')
               .pipe(concat('app.js'))
               .pipe(uglify())
               .pipe(gulp.dest('./dist/scripts'));
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
        gulp.watch('src/js/**/*.js', ['scripts']);
        gulp.watch('src/sass/**/*.scss', ['styles']).on('change', browserSync.reload);
        gulp.watch('src/*.html', []).on('change', browserSync.reload);
});

gulp.task('bower', function () {
    gulp.src('src/index.html')
        .pipe(wiredep())
        .pipe(gulp.dest('./src'));
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });
});

gulp.task('test', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js'
    }, done).start();
});


