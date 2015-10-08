var gulp    = require('gulp');
var config  = require('../config');
var size    = require('gulp-filesize');
var concat = require("gulp-concat");
var uglify = require('gulp-uglify');

gulp.task('uglifyJs', function() {
  return gulp.src(config.javascript.src)
    .pipe(concat("app.js"))
    .pipe(uglify())
    .pipe(gulp.dest(config.javascript.dest))
    .pipe(size());
});
