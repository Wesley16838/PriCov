const gulp = require("gulp");
const concatenate = require("gulp-concat");
const minifyCSS = require("gulp-clean-css");
// const autoPrefix = require("gulp-autoprefixer");
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify")
const changed = require("gulp-changed")

const SCSS_SRC = './src/Assets/scss/**/*.scss'
const SCSS_DEST = './src/Assets/css'

const JS_SRC = './src/Assets/scripts/**/*.js'
const JS_DEST = './src/Assets/js'

gulp.task('compile_scss',function(done){
    gulp.src(SCSS_SRC)
        .pipe(sass().on('error',sass.logError))
        .pipe(concatenate("styles.css"))
        .pipe(gulp.dest(SCSS_DEST))//一般的css檔
        .pipe(minifyCSS())
        .pipe(rename({suffix:'.min'}))
        .pipe(changed(SCSS_DEST))
        .pipe(gulp.dest(SCSS_DEST))//壓縮後的css檔
    done();
})
gulp.task('compile_js', function(done) {
    gulp.src(JS_SRC)
        .pipe(concatenate("scripts.min.js"))
        .pipe(uglify().on('error', function(e){
            console.log(e);
        }))
        .pipe(gulp.dest(JS_DEST));//壓縮後的js檔
    done();
});

gulp.task("build", gulp.parallel(["compile_scss","compile_js"]))

gulp.task('watch', function(done) {
    gulp.watch(SCSS_SRC, gulp.series('compile_scss'));
    gulp.watch(JS_SRC,gulp.series('compile_js'));
    done();
});

gulp.task('default', gulp.series('watch'));

