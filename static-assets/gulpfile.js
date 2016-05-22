var del = require('del');
var gulp = require('gulp');
var ts = require('gulp-typescript');

var tsProject = ts.createProject('tsconfig.json', {typescript: require('typescript')});

gulp.task('default', ['build', 'html', 'css', 'lib']);

gulp.task('lib', ['lib-css', 'lib-js']);

gulp.task('clean', function() {
    return del('dist/**/*');
});

gulp.task('build', function() {
    var tsResult = tsProject.src()
      .pipe(ts(tsProject));

    return tsResult.js
        .pipe(gulp.dest('dist/js'));
});

gulp.task('html', function () {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('css', function () {
    return gulp.src('src/**/*.css')
        .pipe(gulp.dest('dist/css'));
});

gulp.task('lib-css', function() {
   return gulp.src('node_modules/bootstrap/dist/css/bootstrap.css')
       .pipe(gulp.dest('dist/css/lib/'));
});

gulp.task('lib-js', function() {
   return gulp.src([
       'node_modules/es6-shim/es6-shim.js',
       'node_modules/systemjs/dist/system-polyfills.js',
       'node_modules/angular2/es6/dev/src/testing/shims_for_IE.js',
       'node_modules/angular2/bundles/angular2-polyfills.js',
       'node_modules/systemjs/dist/system.src.js',
       'node_modules/rxjs/bundles/Rx.js',
       'node_modules/angular2/bundles/angular2.dev.js',
       'node_modules/angular2/bundles/router.dev.js',
       'node_modules/angular2/bundles/http.dev.js',

       "node_modules/angular2-cookie/bundles/angular2-cookie.js",

   ])
       .pipe(gulp.dest('dist/js/lib/'));
});
