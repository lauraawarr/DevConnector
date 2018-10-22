const gulp = require('gulp')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const prefix = require('gulp-autoprefixer')

// const browserSync = require('browser-sync')
// const reload = browserSync.reload

gulp.task('sass', () =>
  gulp
    .src('./src/App.sass')
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        includePaths: './src'
      })
    )
    .on('error', sass.logError)
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./src'))
    // .pipe(reload({ stream: true }))
)

gulp.task('build', gulp.series('sass'))

gulp.task('default', () => {
    gulp.watch(
        ['./src/App.sass'],
        gulp.series('sass')
    )
})