const gulp = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer'),
  paths = require('./paths');

gulp.task('app-theme', () => {
  return gulp.src(paths.theme)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer({ browsers: ['last 2 versions', 'ie >= 9'] }))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest(paths.dist + 'css'));
});

gulp.task('app-theme-watch', () => {
  return gulp.src(paths.theme)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', function(err) {
      console.log(err.message);
      this.emit('end');
    })).pipe(autoprefixer({ browsers: ['last 2 versions', 'ie >= 9'] }))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest(paths.dist + 'css'));
});