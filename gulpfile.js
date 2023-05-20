const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
// Static server
gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
});

gulp.task('styles', function () {
    return gulp.src("src/sass/*.+(scss|sass)")
        /* мне необходим gulp, который будет переходить адресу src и что - то делать с этим файлом.Внутри src мы прописываем путь к файлу который нас интересует.Дальше все файлы которые подподают под наши критерии должны компилироваться.Для этого /*.+(scss|sass). */
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        /* Я хочу взять этот файл и что-то с ним сделать. Он будет компилировать код sass по пути который мы указали в прошлом шаге */
        /*  Ну и после того, как мы откампилировали код. Этот файл весит в невесомости можно сказать, нам необходимо отправить его в определенную папку */
        .pipe(rename({
            prefix: "",
            suffix: ".min",
        }))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest("src/css")) /* Вот этот файл который у тебя получился положи по определенному адресу */
        .pipe(browserSync.stream()); /* После сохранения я опять буду вызывать browserSync. То есть страница будет обновляться */
});


gulp.task('watch', function () { /* Следит за изменениями в html и вы стилистических файлах */
    gulp.watch("src/sass/*.+(scss|sass)", gulp.parallel("styles")); /* Следи за вот такими вот файлами. При сохранении вызывается*/
    gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));
/* Если мы даём default, то это задача которая вызвается по умолчанию. После вызова команды, я хочу выполнить сразу несколько задач(server и styles) */

