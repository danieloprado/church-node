const gulp = require('gulp');

require('./app');
require('./server');
require('./publish');

gulp.task('clean', ['app-clean', 'server-clean', 'publish-clean']);
gulp.task('develop', ['server-develop', 'app-develop']);
gulp.task('compile', ['server-compile', 'app-compile']);
gulp.task('default', ['develop']);