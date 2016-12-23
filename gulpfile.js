var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var replace = require('gulp-replace-task');
var uglify = require('gulp-uglify');
var pump = require('pump');
var gzip = require('gulp-gzip');

gulp.task('default', ['concat', 'compress', 'gzip']);

gulp.task('gzip', ['compress'], function() {
    return gulp.src('dist/*.js')
    .pipe(gzip())
    .pipe(gulp.dest('dist/'));
});

gulp.task('compress', ['concat'], function(cb){
  pump([
    gulp.src('concat/*.js'),
    uglify(),
    gulp.dest('dist')
  ],
    cb
  );
});

gulp.task('concat', ['concat-jquery', 'concat-angular2']);

gulp.task('concat-jquery', function() {
  return gulp.src(
    [
      //'node_modules/handlebars/dist/handlebars.js',
      'node_modules/jquery/dist/jquery.js',
      'node_modules/ractive/ractive.js'
    ]
  )
    .pipe(concat('jquery.js'))
    .pipe(gulp.dest('concat/'));
});

gulp.task('concat-angular2', function() {
  return gulp.src(
    [
      'node_modules/angular2/bundles/angular2-all.umd.js',
    ]
  )
    .pipe(concat('angular2.js'))
    .pipe(gulp.dest('concat/'));
});
