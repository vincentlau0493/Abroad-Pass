var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
// Additional plugins
var browserify = require('browserify');
var vinylSource = require('vinyl-source-stream');
var plumber = require('gulp-plumber');
var compass = require('gulp-compass');

var paths = {
  sass: ['./scss/**/*.scss'],
  jsSrc: ['./www/js/**/*.js'],
  src: ['./wwww/**/*', '!wwww/lib/**/*', '!www/dist/**/*'],
  appSrc: ['./www/js/app.js'],
  bundleSrc: ['./www/js/dist/bundle.js']
};

var source = {
  style: {
    css: './www/css',
    sass: './scss',
    image: './www/img'
  }
}


//------------------------------------
// DEFAULT
//------------------------------------
gulp.task('default', ['sass', 'compass', 'browserify', 'watch']);


//------------------------------------
// SASS (Only for generating ionic.app.scss)
//------------------------------------
gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});


//------------------------------------
// COMPASS
//------------------------------------
gulp.task('compass', function(done) {
  gulp.src(['./scss/*.scss', '!./scss/ionic.app.scss'])
    .pipe(plumber())
    .pipe(compass(source.style))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});


//------------------------------------
// BROWSERIFY
//------------------------------------
gulp.task('browserify', function() {
  return browserify('./www/js/app.js', {debug: true})
    .on('error', gutil.log)
    .bundle()
    .pipe(vinylSource('bundle.js'))
    .pipe(gulp.dest('./www/dist'));
});


//------------------------------------
// WATCH
//------------------------------------
gulp.task('watch', function() {
  gulp.watch(paths.sass, ['compass']);
  gulp.watch(paths.jsSrc, ['browserify']);
});


//------------------------------------
// EXTRA
//------------------------------------
gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
