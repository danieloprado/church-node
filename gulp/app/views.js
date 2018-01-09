const gulp = require('gulp'),
  pug = require('gulp-pug'),
  replace = require('gulp-replace'),
  templateCache = require('gulp-angular-templatecache'),
  paths = require('./paths');

gulp.task('app-views:index', () => {
  return gulp.src(paths.viewIndex)
    .pipe(pug({ pretty: false }))
    .pipe(replace('@NOW', new Date() * 1))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('app-views:others', () => {
  return gulp.src(paths.views)
    .pipe(pug({ pretty: false }))
    .pipe(replace('@NOW', new Date() * 1))
    .pipe(templateCache('templates.min.js', { module: 'app', root: '/views' }))
    .pipe(gulp.dest(paths.dist + '/js'));
});

gulp.task('app-views', ['app-views:index', 'app-views:others']);

gulp.task('app-views-watch:index', () => {
  return gulp.src(paths.viewIndex)
    .pipe(pug({ pretty: false }).on('error', function(err) {
      console.log(err.message);
      this.end();
    }))
    .pipe(replace('@NOW', new Date() * 1))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('app-views-watch:others', () => {
  return gulp.src(paths.views)
    .pipe(pug({ pretty: false }).on('error', function(err) {
      console.log(err.message);
      this.end();
    }))
    .pipe(replace('@NOW', new Date() * 1))
    .pipe(templateCache('templates.min.js', { module: 'app', root: '/views' }))
    .pipe(gulp.dest(paths.dist + '/js'));
});