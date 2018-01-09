const gulp = require('gulp'),
  pug = require('gulp-pug'),
  inlineCss = require('gulp-inline-css'),
  paths = require('./paths'),
  rimraf = require('rimraf');

gulp.task('server-templates', ['server-templates-clean'], () => {
  return gulp.src(paths.templates)
    .pipe(gulp.dest(`${paths.dist}/templates`));
});

gulp.task('server-templates-watch', ['server-templates'], () => {
  gulp.watch(`${paths.src}/**/*.pug`, ['server-templates']);
});

gulp.task('server-templates-clean', callback => {
  rimraf(`${paths.dist}/templates/**/*`, callback);
});

gulp.task('server-templates-publish', () => {
  return gulp.src(paths.templates)
    .pipe(gulp.dest(paths.publish + '/templates'));
});

gulp.task('server-templates-test', () => {
  return gulp.src(paths.templates)
    .pipe(pug({
      pretty: false,
      locals: {
        firstName: 'Daniel',
        password: '123456',
        urlSite: 'http://localhost:3000',
        error: new Error('test'),
        user: {
          id: 1,
          email: 'test@email.com',
          firstName: 'test',
          lastName: 'test',
          roles: []
        }
      }
    }))
    .pipe(inlineCss())
    .pipe(gulp.dest('./output-emails/templates'));
});

gulp.task('server-templates-test-watch', ['server-templates-test'], () => {
  gulp.watch(paths.templates, ['server-templates-test']);
});

gulp.task('server-templates-develop', ['server-templates-watch']);