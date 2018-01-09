const gulp = require('gulp');

require('./templates');
require('./typescript');

gulp.task('server-clean', ['server-typescript-clean', 'server-templates-clean']);
gulp.task('server-compile', ['server-typescript', 'server-templates']);
gulp.task('server-watch', ['server-typescript-watch', 'server-templates-watch']);
gulp.task('server-develop', ['server-typescript-develop', 'server-templates-develop']);
gulp.task('server-publish', ['server-typescript-publish', 'server-templates-publish']);