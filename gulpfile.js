    "use strict";

const   config = require('./gulpconfig.js'),
        gulp = require('gulp'),
        rigger = require('gulp-rigger'),
        less = require('gulp-less'),
        autoprefixer = require('gulp-autoprefixer'),
        connect = require('gulp-connect'),
        browserSync = require('browser-sync').create();


gulp.task('css',function() {
    return gulp.src(config.paths.stylesheets)
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(gulp.dest(config.paths.build))
});

gulp.task('js',function(){
    return gulp.src(config.paths.js)
        .pipe(gulp.dest(config.paths.build));
});

gulp.task('html',function(){
    return gulp.src(config.paths.html)
        .pipe(rigger())
        .pipe(gulp.dest(config.paths.build))
});

gulp.task('server', function(){
    connect.server({root: config.paths.build, port: config.port});
});

gulp.task('serve', ['server'], function() {
    browserSync.init(null, config.browserSync);
});

gulp.task('watch', function(){
    gulp.watch(config.paths.less, ['css']);
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js']);
});

gulp.task('default', ['css', 'js', 'html', 'serve', 'watch']);