var gulp = require("gulp");
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var config = require("../config");

gulp.task("concatJs", function () {
  return gulp.src([
    "./node_modules/angular/angular.js",
    "./node_modules/angular-route/angular-route.js",
    "./src/app/**/*.js",
  ])
  .pipe(concat("build.js"))
  .pipe(gulp.dest(config.dest))
  .pipe(rename("uglify.js"))
  .pipe(uglify())
  .pipe(gulp.dest(config.dest));
});
