var gulp = require('gulp'),
  del = require('del'),
  runSequence = require('run-sequence'),
  inject = require('gulp-inject'),
  jshint = require('gulp-jshint'),
  livereload = require('gulp-livereload'),
  connect = require('gulp-connect'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  ngAnnotate = require('gulp-ng-annotate'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  CacheBuster = require('gulp-cachebust'),
  cachebust = new CacheBuster(),
  files = require('./gulp.config.js');

gulp.task('default', function(callback) {
  runSequence('build', 'watch', 'serve', callback);
});

gulp.task('build', function (callback) {
  runSequence('clean',
    'copy-build',
    'index',
    callback);
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(files.app_files.js, ['lint', 'build']);
  gulp.watch(files.app_files.html, ['build']);
  gulp.watch(files.app_files.sass, ['build']);
});

gulp.task('serve', function() {
  connect.server({
    root: 'build',
    livereload: true
  });
});

gulp.task('index',function(){
  return gulp.src('./src/index.html')
    .pipe(inject(gulp.src(files.app_files.tpl_src), {ignorePath: 'build'}))
    .pipe(gulp.dest(files.build_dir));
});

gulp.task('clean', function () {
 return del([files.build_dir], {force: true});
});

gulp.task('copy-build', ['copy-html', 'sass', 'copy-fonts', 'minify-copy-app-js', 'copy-vendor-js']);

gulp.task('copy-html', function () {
  return gulp.src([files.app_files.html, '!./src/index.html'])
    .pipe(gulp.dest(files.build_dir)).pipe(livereload());
});

gulp.task('sass', function () {
  return gulp.src(files.app_files.sass)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(cachebust.resources())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(files.build_dir));
});

gulp.task('copy-fonts', function () {
  return gulp.src([files.app_files.fonts], {base: 'src/assets'})
    .pipe(gulp.dest('./build/assets'));
});
gulp.task('minify-copy-app-js', function () {
  return gulp.src(files.app_files.js)
    .pipe(concat('sudoku.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('./build/app'));
});

gulp.task('copy-vendor-js', function() {
  return gulp.src(files.app_files.vendor_js)
    .pipe(concat('angular.js'))
    .pipe(gulp.dest('./build/vendor'));
});

gulp.task('lint', function() {
  return gulp.src(files.app_files.js)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
