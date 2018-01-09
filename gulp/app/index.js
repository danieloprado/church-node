const gulp = require('gulp'),
  rimraf = require('rimraf'),
  sequence = require('gulp-sequence'),
  paths = require('./paths');

require('./libs');
require('./scripts');
require('./style');
require('./views');

gulp.task('app-watch', () => {
  gulp.watch('app/**/*.scss', ['app-theme-watch']);
  gulp.watch(paths.viewIndex, ['app-views-watch:index']);
  gulp.watch(paths.views, ['app-views-watch:others']);
  gulp.watch(paths.js, ['app-js']);
});

gulp.task('app-compile', (cb) => {
  sequence('app-clean', ['app-libs', 'app-views', 'app-theme', 'app-js'], () => cb());
});

gulp.task('app-compile-publish', (cb) => {
  sequence('app-clean', ['app-libs', 'app-views', 'app-theme', 'app-js-publish'], () => cb());
});

gulp.task('app-develop', ['app-compile', 'app-watch']);
gulp.task('app-clean', cb => rimraf(`${paths.dist}/**/*`, cb));

gulp.task('app-publish', ['app-compile-publish'], () => {
  return gulp.src(`${paths.dist}/**/*`).pipe(gulp.dest(paths.publish));
});