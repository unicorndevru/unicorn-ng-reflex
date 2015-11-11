import gulp from 'gulp'
import del from 'del'
import order from 'gulp-order'
import ngAnnotate from 'gulp-ng-annotate'
import uglify from 'gulp-uglify'
import concat from 'gulp-concat'
import rename from 'gulp-rename'
import babel from 'gulp-babel'
import angularFilesort from 'gulp-angular-filesort'
import merge2 from 'merge2'

const src = "src/unicorn-ng-reflex/**/**.js"
const dist = "dist"
const fileName = "unicorn-ng-reflex.js"
const minfFileName = "unicorn-ng-reflex.min.js"

gulp.task('build', () => {
  del.sync(dist)

  return gulp.src(src)
    .pipe(babel())
    .pipe(order([]))
    .pipe(angularFilesort())
    .pipe(ngAnnotate())
    .pipe(concat(fileName, {
      newLine: '\n'
    }))
    .pipe(gulp.dest(dist))
    .pipe(uglify())
    .pipe(rename(minfFileName))
    .pipe(gulp.dest(dist))

})
