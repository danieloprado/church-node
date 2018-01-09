'use strict';

const gulp = require('gulp'),
  rimraf = require('rimraf'),
  tslint = require('gulp-tslint'),
  nodemon = require('gulp-nodemon'),
  paths = require('./paths'),
  exec = require('child_process').exec;

let nodemonInstance;

gulp.task('server-typescript-clean', callback => {
  rimraf(`${paths.dist}/**/*.js`, callback);
});

gulp.task('server-typescript-lint', () => {
  return gulp.src(`${paths.src}/**/*.ts`)
    .pipe(tslint({ formatter: 'verbose', program: require('tslint').Linter.createProgram(__dirname + '/../../tsconfig.json') }))
    .pipe(tslint.report());
});

gulp.task('server-typescript', ['server-typescript-lint'], cb => {
  exec('node ./node_modules/typescript/bin/tsc', (err, stdout) => {
    console.log(stdout);
    if (err) throw err;
    cb();
  });
});

gulp.task('server-typescript-watch-exec', cb => { // eslint-disable-line
  console.time('typescript');
  const data = exec('node ./node_modules/typescript/bin/tsc -w');

  data.stdout.on('data', data => {

    if (data.includes('Compilation complete')) {
      console.timeEnd('typescript');
    }

    if (data.includes('File change detected')) {
      console.time('typescript');

      // exec('npm run gulp server-typescript-lint').stdout.on('data', data => {
      //   console.log('lint: ' + data.replace(/^\n/g, ''));
      // });
    }

    console.log('typescript: ' + data);
  });

  data.stderr.on('data', data => console.error(data));
});

gulp.task('server-typescript-watch', ['server-typescript-clean'], cb => {
  const data = exec('npm run gulp server-typescript-watch-exec');

  let error = false,
    firstTime = true;

  data.stdout.on('data', data => {
    if (
      /^\[\d{2}:\d{2}:\d{2}\]$\s{0,}/g.test(data.replace(/\n/g, '').trim()) ||
      /^lint: \[\d{2}:\d{2}:\d{2}\]\s{0,}$/g.test(data.replace(/\n/g, '').trim()) ||
      data.includes('Using gulpfile') ||
      data.startsWith('>') ||
      data.startsWith('lint: >') ||
      data.startsWith('lint: ERROR:')
    ) return;

    if (data.includes('Compilation complete') && !error) {
      cb && cb();
      cb = null;

      !firstTime && nodemonInstance && nodemonInstance.emit('restart');
      firstTime = false;
    }

    if (data.includes('File change detected')) {
      error = false;
      console.log('\n\n\n***************************************************************************');
    }

    if (data.includes('error')) {
      error = true;
      console.log('======v');
      console.log(data.replace(/\n\n/g, '').replace(/\n$/g, ''));
      console.log('======^');
      return;

    }

    console.log(data.replace(/\n\n/g, '').replace(/\n$/g, ''));
  });

});

gulp.task('server-typescript-develop', ['server-typescript-watch'], () => {
  nodemonInstance = nodemon({
    script: `${paths.dist}/main.js`,
    ext: '__manual_watch__',
    watch: 'src/__manual_watch__/',
    exec: 'node --inspect=0.0.0.0:5859',
    stdout: true,
    delay: 5
  });
});

gulp.task('server-typescript-publish', ['server-typescript'], () => {
  return gulp.src([`${paths.dist}/**/*.js`, `!${paths.dist}/**/*.spec.js`])
    .pipe(gulp.dest(paths.publish));
});