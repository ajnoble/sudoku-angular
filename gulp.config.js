module.exports = {
  build_dir: 'build',
  app_files: {
    js: ['src/app/**/*.js'],
    vendor_js: [
      './node_modules/angular/angular.min.js',
      './node_modules/angular-ui-router/release/angular-ui-router.min.js'
    ],
    html: 'src/**/*.html',
    sass: 'src/**/*.scss',
    fonts: 'src/assets/fonts/**/*',
    tpl_src: ['./build/vendor/**/*.js', './build/app/**/*.js', './build/assets/css/**/*.css']
  }
};
