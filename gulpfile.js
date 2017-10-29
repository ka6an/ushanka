'use strict'

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    browserSync = require("browser-sync"),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnext = require('cssnext'),
    pxtorem = require('postcss-pxtorem'),
    del = require('del'),
    gulpIf = require('gulp-if'),
    customProperties = require("postcss-custom-properties"),
    csslint = require('gulp-csslint'),
    htmlhint = require("gulp-htmlhint"),
    fileinclude = require('gulp-file-include'),
    reload = browserSync.reload;

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'dev';

var path = {
    app: {
        html: 'app/*.html',
        js: 'app/js/*.js',
        css: 'app/css/*.css',
        img: 'app/img/**/*.*'
    },
    dist: {
        html: 'dist/',
        js: 'dist/js/',
        css: 'dist/css/',
        img: 'dist/img/'
    },
    watch: {
        html: 'app/**/*.html',
        js: 'app/js/**/*.js',
        css: 'app/css/**/*.css',
        img: 'app/img/**/*.*',
        assets: 'app/assets/**/*.*'
    },
    clean: './dist'
};

var config = {
    server: {
        baseDir: "./dist"
    },
    host: 'localhost',
    port: 9000,
    logPrefix: "ka6an"
};


gulp.task('html', function() {
    return gulp.src(path.app.html)
        .pipe(htmlhint())
        .pipe(gulp.dest(path.dist.html))
        .pipe(reload({ stream: true }));
});

gulp.task('js', function() {
    return gulp.src(path.app.js)
        .pipe(gulp.dest(path.dist.js))
        .pipe(reload({ stream: true }));
});

gulp.task('css', function() {
    var plugins = [
        autoprefixer,
        cssnext,
        customProperties,
        pxtorem
    ];
    return gulp.src(path.app.css)
        .pipe(gulpIf(!isDev, postcss(plugins)))
        .pipe(gulpIf(isDev, sourcemaps.init()))
        .pipe(csslint())
        .pipe(csslint.formatter())
        .pipe(gulpIf(isDev, sourcemaps.write()))
        .pipe(gulp.dest(path.dist.css))
        .pipe(reload({ stream: true }));
});

gulp.task('img', function() {
    return gulp.src(path.app.img)
        .pipe(imagemin({
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(path.dist.img))
        .pipe(reload({ stream: true }));
});

gulp.task('assets', function() {
    return gulp.src(['app/assets/**/*.*', 'app/assets/.*'])
        .pipe(gulp.dest('dist/'))
        .pipe(reload({ stream: true }));
});

// запуск сервера
gulp.task('webserver', function() {
    browserSync(config);
});

// отслеживание изменений
gulp.task('watch', function() {
    watch([path.watch.html], function() {
        gulp.start('html');
    });
    watch([path.watch.css], function() {
        gulp.start('css');
    });
    watch([path.watch.js], function() {
        gulp.start('js');
    });
    watch([path.watch.img], function() {
        gulp.start('img');
    });
    watch([path.watch.assets], function() {
        gulp.start('assets');
    });
});

// очистка папки с финальной сборкой
gulp.task('clean', function() {
    return del(path.clean);
});

// тестовая сборка, отслеживание изменений и запуск сервера
gulp.task('start', ['build', 'webserver', 'watch']);

// финальная сборка
gulp.task('build', ['html', 'js', 'css', 'img', 'assets']);