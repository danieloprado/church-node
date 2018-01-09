const gulp = require('gulp'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename');

const paths = require('./paths');

//LIBS
gulp.task('app-css:libs', () => {
  return gulp.src(paths.cssLibs)
    .pipe(concat('libs.min.css'))
    .pipe(gulp.dest(paths.dist + 'css'));
});

gulp.task('app-js:libs', () => {
  return gulp.src(paths.jsLibs)
    .pipe(concat('libs.min.js'))
    .pipe(gulp.dest(paths.dist + 'js'));
});

gulp.task('app-imgs', () => {
  return gulp.src(paths.imgs)
    .pipe(gulp.dest(paths.dist + 'imgs'));
});

gulp.task('app-fonts', function() {
  return gulp.src(paths.fonts)
    .pipe(rename({ dirname: '' }))
    .pipe(gulp.dest(paths.dist + '/css/fonts'));
});

gulp.task('app-svgs', () => {
  return gulp.src(paths.svgs)
    .pipe(gulp.dest(paths.dist + 'svgs'));
});

gulp.task('app-libs', ['app-css:libs', 'app-js:libs', 'app-imgs', 'app-svgs', 'app-fonts']);