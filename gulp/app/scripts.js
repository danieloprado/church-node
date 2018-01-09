const gulp = require('gulp'),
  eslint = require('gulp-eslint'),
  sourcemaps = require('gulp-sourcemaps'),
  concat = require('gulp-concat'),
  babel = require('gulp-babel'),
  uglify = require('gulp-uglify'),
  replace = require('gulp-replace'),
  paths = require('./paths');

gulp.task('app-js:lint', () => {
  return gulp.src(paths.js)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError('stylish'));
});

gulp.task('app-js', ['app-js:lint'], () => compile('development'));
gulp.task('app-js-publish', ['app-js:lint'], () => compile('production'));

function compile(env) {
  return gulp.src(paths.js)
    .pipe(sourcemaps.init())
    .pipe(concat('all.min.js'))
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(replace('@ENV', env))
    .pipe(uglify())
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest(paths.dist + 'js'));
}