import gulp from 'gulp';
import plugins from 'gulp-load-plugins';

import browserify from 'browserify';
import babelify from 'babelify';

import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

import log from 'fancy-log';
import yargs from 'yargs';

const $ = plugins();
const argv = yargs.argv;

const LIVE = argv.live;

const names = {
    src: './src/',
    build: './build/'
};


/* -------------- */
/* Source objects */
/* -------------- */

class SourceObject {
    constructor(name, ext) {
        this.name = name;
        // Source entry files must be accessible via path: './src/<name>/index.<ext>'
        this.entry = names.src + name + '/index.' + ext;
        this.glob = names.src + name + '/**/*.' + ext;
        this.build = names.build;
    }
}

const sources = {
    manifest: './manifest.json',
    icons: './icons/*',
    background: new SourceObject('background', 'js'),
    content: {
        js: new SourceObject('content', 'js'),
        sass: new SourceObject('content', 'scss')
    },
    popup: {
        js: new SourceObject('popup', 'js'),
        sass: new SourceObject('popup', 'scss'),
        html: names.src + 'popup/popup.html'
    }
};


/* ------------------- */
/* Streaming functions */
/* ------------------- */

function lint(src) {
    return function linting() {
        return gulp.src(src)
            .pipe($.eslint())
            .pipe($.eslint.format())
            .pipe($.eslint.failAfterError());
    }
}

function build(src) {
    let name = src.name + (LIVE ? '.min' : '') + '.js';
    return function building() {
        return browserify({entries: src.entry}).transform(babelify).bundle()
            .pipe(source(name))
            .pipe(buffer())
            .pipe($.if(LIVE, $.uglify().on('error', log.error)))
            .pipe(gulp.dest(src.build));
    }
}

function sass(src) {
    return function sassing() {
        return gulp.src(src.entry)
            .pipe($.sass().on('error', $.sass.logError))
            .pipe($.rename(src.name + '.css'))
            .pipe(gulp.dest(src.build));
    }
}

function copy(src, folder) {
    const destination = names.build + (folder ? '/' + folder : '');
    return function copying() {
        return gulp.src(src).pipe(gulp.dest(destination));
    }
}


/* ---------- */
/* Gulp tasks */
/* ---------- */

gulp.task('lint', gulp.series(
    lint([
        sources.content.js.glob,
        sources.background.glob,
        sources.popup.js.glob
    ])
));

gulp.task('js', gulp.parallel(
    build(sources.content.js),
    build(sources.background),
    build(sources.popup.js)
));

gulp.task('sass', gulp.series(
    sass(sources.popup.sass),
    sass(sources.content.sass)
));

gulp.task('copy', gulp.parallel(
    copy(sources.icons, 'icons'),
    copy(sources.manifest),
    copy(sources.popup.html)
));

gulp.task('build', gulp.series('lint',
    gulp.parallel('js', 'sass', 'copy')));

gulp.task('watch',
    gulp.series('build', function watching() {
        // Watch content sources
        gulp.watch(sources.content.js.glob).on('change',
            gulp.series(lint(sources.content.js.glob), build(sources.content.js)));

        // Watch content sass
        gulp.watch(sources.content.sass.glob).on('change',
            gulp.series(sass(sources.content.sass)));

        // Watch background sources
        gulp.watch(sources.background.glob).on('change',
            gulp.series(lint(sources.background.glob), build(sources.background)));

        // Watch popup js
        gulp.watch(sources.popup.js.glob).on('change',
            gulp.series(lint(sources.popup.js.glob), build(sources.popup.js)));

        // Watch popup sass
        gulp.watch(sources.popup.sass.glob).on('change',
            gulp.series(sass(sources.popup.sass)));
    })
);

gulp.task('default', gulp.series('watch'));