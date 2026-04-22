import gulp from 'gulp';
import plugins from 'gulp-load-plugins';

const $ = plugins();

const jsGlob = '[!node_modules]**.js';


/* ------------------- */
/* Streaming functions */
/* ------------------- */

function lint(src) {
    return function linting() {
        return gulp.src(src)
            .pipe($.eslint())
            .pipe($.eslint.format())
            .pipe($.eslint.failAfterError());
    };
}


/* ---------- */
/* Gulp tasks */
/* ---------- */

gulp.task('lint', gulp.series(lint(jsGlob)));

gulp.task('watch',
    gulp.series(function watching() {
        gulp.watch(jsGlob).on('change', gulp.series('lint'));
    })
);

gulp.task('default', gulp.series('watch'));