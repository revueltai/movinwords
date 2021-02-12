import gulp from 'gulp'
import header from 'gulp-header'
import babel from 'gulp-babel'
import rename from 'gulp-rename'
import uglify from 'gulp-uglify'
import cleanCSS from 'gulp-clean-css'
import size from 'gulp-size'

const pkg = require('./package.json')
const baseJSFilePath = './src/movinwords.js'
const baseCSSFilePath = './src/styles/movinwords.css'
const destinyFilePath = './dist'
const heading =
`/*
 * ${ pkg.name } v${ pkg.version } - ${ pkg.description }
 * Copyright (c) ${ new Date().getFullYear() } ${ pkg.author }
 */
`

gulp.task('build-module', () => {
  gulp.src(baseJSFilePath)
    .pipe(babel({
      plugins: [
        'transform-object-rest-spread'
      ],
      presets: ['es2015']
    }))
    .pipe(header(heading, { pkg }))
    .pipe(rename(pkg.name + '.module.js'))
    .pipe(gulp.dest(destinyFilePath))
})

gulp.task('build-web', () => {
  gulp.src(baseJSFilePath)
    .pipe(babel({
      compact: true,
      plugins: [
        'add-module-exports',
        'transform-object-rest-spread',
        'transform-es2015-modules-umd'
      ],
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(size({
      gzip: true
    }))
    .pipe(header(heading, {
      pkg
    }))
    .pipe(rename(pkg.name + '.min.js'))
    .pipe(gulp.dest(destinyFilePath))
});

gulp.task('build-css', () => {
  gulp.src(baseCSSFilePath)
    .pipe(cleanCSS())
    .pipe(rename(pkg.name + '.min.css'))
    .pipe(gulp.dest(destinyFilePath))
})

gulp.task('build', [
  'build-module',
  'build-web',
  'build-css'
])
