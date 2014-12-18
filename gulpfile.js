var gulp = require('gulp');
var less = require('gulp-less');
var watch = require('gulp-watch');
var gcmq = require('gulp-group-css-media-queries');
var autoprefixer = require('gulp-autoprefixer');
var webserver = require('gulp-webserver');


gulp.task('media',['less'], function () {
    gulp.src('css/*.css')
        .pipe(gcmq())
        .pipe(gulp.dest('css'));
});

gulp.task('less', function () {
  gulp.src('less/*.less')
    .pipe(less())
    .pipe(autoprefixer({
            browsers: ['> 1%', 'IE 7'],
            cascade: false
        }))
    .pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
    gulp.watch('less/*.less', ['less']);  // Watch all the .less files, then run the less task
});

gulp.task('prefixer',['media'], function () {
    gulp.src('css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('css'));
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});



gulp.task('default', ['watch','media','webserver']);
