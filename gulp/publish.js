const gulp = require('gulp'),
  sequence = require('gulp-sequence'),
  rimraf = require('rimraf');

gulp.task('publish-clean', callback => rimraf('publish/**/*', callback));

gulp.task('publish', (cb) => {
  return sequence('clean', ['publish-package', 'publish-knex', 'app-publish', 'server-publish'], () => {
    cb();
  });
});

gulp.task('publish-package', () => {
  return gulp.src(['package.json', 'yarn.lock', 'docker/prod/ecosystem.json', 'docker/prod/*', '.dockerignore']).pipe(gulp.dest('publish'));
});

gulp.task('publish-knex', () => {
  return gulp.src([
    './knexfile.js',
    './migrations/**/*',
    './seeds/**/*'
  ], { base: './' }).pipe(gulp.dest('publish'));
});