var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');

gulp.task('default', ['jade','sass','watch']);

gulp.task('jade', function() {
  console.log('Running Jade');
  gulp.src('./public/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./public/html'))
});

gulp.task('sass', function () {
  console.log('Running Sass');
  gulp.src('./public/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function () {
  gulp.watch('./public/**/*.jade', ['jade']);
  gulp.watch('./public/sass/**/*.scss', ['sass']);
});

var app = 'application/app.js';
gulp.task('nodemon', function() {
  nodemon({
    script: app,
  }).on('start');
});