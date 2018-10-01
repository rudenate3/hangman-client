const gulp = require('gulp'),
  concat = require('gulp-concat'),
  templateCache = require('gulp-angular-templatecache')

gulp.task('concat', () => {
  return gulp
    .src(['./src/app.js', './temp/templates.js', './src/**/*.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('vendor', () => {
  return gulp
    .src([
      './node_modules/angular/angular.min.js',
      './node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',
      './node_modules/amazon-cognito-auth-js/dist/amazon-cognito-auth.js',
      './node_modules/amazon-cognito-identity-js/dist/amazon-cognito-identity.js'
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('bootstrap', () => {
  return gulp
    .src('./node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(gulp.dest('./dist'))
})

gulp.task('templateCache', () => {
  return gulp
    .src('./src/**/*.html')
    .pipe(templateCache('templates.js', { module: 'hangman' }))
    .pipe(gulp.dest('./temp/'))
})

gulp.task('images', () => {
  return gulp.src('./assets/images/*.png').pipe(gulp.dest('./dist/images'))
})
