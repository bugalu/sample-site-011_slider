const { src, dest, watch, series, parallel } = require('gulp');
const loadPlugins = require('gulp-load-plugins');
const $ = loadPlugins();



//ベンダープレフィックス
const autoprefixer = require('autoprefixer');

//動作確認用サーバー
const browserSync = require('browser-sync');
const server = browserSync.create();


function compile() {
  return src('./src/*.pug')
    .pipe($.pug({ pretty: true }))
    .pipe(dest('./dist'));
}

function styles() {
  return src('./src/sass/*.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass())
    .pipe($.postcss([
      autoprefixer()
    ]))
    .pipe($.csscomb('zen.json'))
    .pipe($.sourcemaps.write('.'))
    .pipe(dest('./dist/css'));
}

function scripts() {
  return src('./src/js/*.js')
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write('.'))
    .pipe(dest('./dist/js'));
}

function startAppServer() {
  server.init({
    server: {
      baseDir: './dist'
    }
  });
  watch('./src/**/*.pug', compile);
  watch('./src/**/*.pug').on('change', server.reload);
  watch('./src/**/*.scss', styles);
  watch('./src/**/*.scss').on('change', server.reload);
  watch('./src/**/*.js', scripts);
  watch('./src/**/*.js').on('change', server.reload);
}


const serve = series(parallel(compile, styles, scripts), startAppServer);
exports.compile = compile;
exports.styles = styles;
exports.scripts = scripts;
exports.serve = serve;
