import del from 'del'
import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import path from 'path'
import RunSequence from 'run-sequence'

const plugins = gulpLoadPlugins()

const paths = {
  es5: ['./**/*.js', '!dist/**', '!node_modules/**', '!coverage/**'],
  nonJs: ['./package.json', './.gitignore', './.env'],
  tests: './server/tests/*.js'
}

// 清理并覆盖目录
gulp.task('clean', () => del.sync(['dist/**', 'dist/.*', 'coverage/**', '!dist', '!coverage']))

// 拷贝非 js 文件到输出目录
gulp.task('copy', ['copy:config'], () => gulp.src(paths.nonJs).pipe(plugins.newer('dist')).pipe(gulp.dest('dist')))

// 拷贝 config 目录下 JSON 文件到输出目录
gulp.task('copy:config', () => gulp.src('./config/*.json').pipe(plugins.newer('dist/config')).pipe(gulp.dest('dist/config')))

// 转换 es6 到 es5 并拷贝至 dist 目录
gulp.task('babel', () => {
  gulp
    .src([...paths.es5, '!gulpfile.babel.js'], { base: '.' })
    .pipe(plugins.newer('dist'))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.babel())
    .pipe(plugins.sourcemaps.write('.', {
      includeContent: false,
      sourceRoot: file => path.relative(file.path, __dirname)
    }))
    .pipe(gulp.dest('dist'))
})

// 启动服务器并当文件发生变化时重新启动
gulp.task('nodemon', ['copy', 'babel'], plugins.nodemon({
  script: path.join('dist', 'index.js'),
  ext: 'js',
  ignore: ['node_modules/**/*.js', 'dist/**/*.js', 'logs/**', 'files/**', 'tests/**', '.vscode/**'],
  tasks: ['copy', 'babel']
}))

// default task: clean dist, compile js files and copy non-js files.
gulp.task('default', ['clean'], () => { RunSequence(['copy', 'babel']) })

// gulp serve for development
gulp.task('dev', ['clean'], () => RunSequence('nodemon'))

gulp.task('webpack', ['clean:webpack'], cb => {
  webpack(require('../webpack.config.js')(), (err, stats) => {
    console.error(err, stats)
    cb()
  })
})

gulp.task('watch:webpack', ['clean:webpack'], () => {})

gulp.task('build:webpack', ['clean:webpack'], cb => {})

gulp.task('clean:webpack', () => {})
