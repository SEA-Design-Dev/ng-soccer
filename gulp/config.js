var dest = "./public";
var src = './src';

module.exports = {
  javascript: {
    src: src + '/app/**/*.js',
    dest: dest + '/js/'
  },

  assets: {
    src: src + "/assets/**/*",
    dest: dest + '/assets/'
  },
  sass: {
    src: src + "/styles/**/*.{sass,scss}",
    dest: dest + '/styles/',
  },
  partials: {
    src: [src + "/app/**/*.html", "!" + src + "/app/index.html"],
    dest: dest + "/partials/",
  },
  server: {
    src: dest,
    livereload: true,
    directoryListing: false,
    open: false,
    port: 9000
  },
};
