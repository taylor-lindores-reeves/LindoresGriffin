const gulp = require('gulp');
      watch = require('gulp-watch');
      browserSync = require('browser-sync');
      nodemon = require('gulp-nodemon');
      reload = browserSync.reload;

require('./gulp/tasks/scripts');
require('./gulp/tasks/styles');

gulp.task('watch', ['sync'], function(){
    gulp.watch('./app/assets/styles/**/*.css', ['styles']);
    gulp.watch('./app/javascript/**/*.js', ['scripts']);
    gulp.watch('./app/*.js', ['scripts']);
});

gulp.task('sync', ['browser-sync'], function() {
    gulp.watch(["app/views/**/*.pug"], reload);
    watch('app/assets/styles/**/*.css', function() {
        return gulp.src('app/temp/styles/styles.bundle.css')
            .pipe(browserSync.stream());
    });
});

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init(null, {
        proxy: "http://localhost:5000/",
        open: false
    });
});

gulp.task('nodemon', function (cb) {
    let called = false;
    return nodemon({script: 'app/server.js'}).on('start', function () {
        if (!called) {
            called = true;
            cb();
        }
    });
});