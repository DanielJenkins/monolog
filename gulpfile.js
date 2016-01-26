var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var nodemon = require('gulp-nodemon');

gulp.task('default', ['jade','sass','watch','nodemon']);

gulp.task('jade', function() {
  console.log('Running Jade');
  gulp.src('./build/jade/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./application/public/html'))
});

gulp.task('sass', function () {
  console.log('Running Sass');
  gulp.src('./build/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./application/public/css'));
});

gulp.task('watch', function () {
  gulp.watch('./build/jade/**/*.jade', ['jade']);
  gulp.watch('./build/sass/**/*.scss', ['sass']);
});

var app = 'application/app.js';
gulp.task('nodemon', function() {
  nodemon({
    script: app,
  }).on('start');
});