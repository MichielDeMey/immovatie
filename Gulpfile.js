var APP_PATH    = './',
    BOWER_PATH  = './components';

var gulp    = require('gulp'),
    connect = require('gulp-connect');

gulp.task('connect', function () {
  connect.server({
    livereload: true,
    port: 9000,
    host: '*'
  });
});

gulp.task('default', ['connect'], function () {
  // Watch for changes
  // gulp.watch(APP_PATH + '/**/*', ['default']);
});