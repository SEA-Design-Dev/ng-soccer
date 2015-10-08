var gulp     = require('gulp');
var config   = require('../config');

gulp.task('watch', function() {
  gulp.watch(config.html.src, ['html']);
  gulp.watch(config.javascript.src, ['jshint', 'uglifyJs']);
  gulp.watch(config.sass.src,   ['sass']);
  // Watchify will watch and recompile our JS, so no need to gulp.watch it
});
