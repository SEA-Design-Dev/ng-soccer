var gulp    = require('gulp');
var config  = require('../config');
var size    = require('gulp-filesize');
var concat = require("gulp-concat");
var uglify = require('gulp-uglify');

gulp.task('uglifyJs', function() {
  return gulp.src([
    "./node_modules/angular/angular.js",
    "./node_modules/angular-route/angular-route.js",
    config.javascript.src
  ])
    .pipe(concat("app.js"))
    .pipe(uglify())
    .pipe(gulp.dest(config.javascript.dest))
    .pipe(size());
});
