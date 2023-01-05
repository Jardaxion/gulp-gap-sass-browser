const {src, dest, watch, parallel} = require('gulp'); // gulp functions

const scss = require('gulp-sass')(require('sass')); // Converter scss
const pug = require('gulp-pug'); // Converter pug
const ts = require('gulp-typescript'); // Converter ts
const htmlmin = require('gulp-htmlmin'); // minification html

const concat = require('gulp-concat'); // Concat files
const uglify = require('gulp-uglify-es').default; // Minification files
const sourcemaps = require('gulp-sourcemaps'); // Sourseemap
const csscomb = require('gulp-csscomb'); // Beatifule css

const autoprefixer = require('gulp-autoprefixer'); // Crossbrowser for css
const browserSync = require('browser-sync').create(); // Local server for live reload

const plumber = require('gulp-plumber'); // Error in console
const notify = require('gulp-notify'); // Error in OS alert
const zip = require('gulp-zip'); // Archive files

//command
// gulp - for start live server
// gulp build - Build the project in the dist folder
// gulp zipBuild - Archives files from dist

//Сервер
function bs(){
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
}

//From pug to html
function view(){
    return src('app/pug/**/*.pug')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(pug({
        pretty: true
    }))
    .pipe(dest('app/'))
    .pipe(browserSync.stream())
}

//Minification html
function htmlMin(){
    return src('app/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true, // удаляем все переносы
            removeComments: true // удаляем все комментарии
        }))
        .pipe(dest('minDist/'))
}

//Script
//Converter ts
function scripts(){
    return src('app/ts/**/*.ts')
            .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
            .pipe(ts({
                "target": "ES2020",
                "module": "ESNext",
            }))
            .pipe(concat('main.js'))
            .pipe(dest('app/js'))
}

//Minification js
function scriptsMin(){
    return src('app/js/main.js')
            .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
            .pipe(sourcemaps.init())
            .pipe(concat('main.min.js'))
            .pipe(uglify())
            .pipe(sourcemaps.write('.'))
            .pipe(dest('app/js'))
            .pipe(browserSync.stream())
}

//css
//Scss to css and min
function stylesMin(){
    return src('app/scss/style.scss')
           .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
           .pipe(sourcemaps.init())
           .pipe(scss({outputStyle: 'compressed'}))
           .pipe(concat('style.min.css'))
           .pipe(autoprefixer({
                overrideBrowserslist: ['last 10 version']
           }))
           .pipe(sourcemaps.write('.'))
           .pipe(dest('app/css'))
           .pipe(browserSync.stream()) 
}

//Scss to css
function styles(){
    return src('app/scss/style.scss')
           .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
           .pipe(sourcemaps.init())
           .pipe(scss({outputStyle: 'expanded'}))
           .pipe(autoprefixer({
                    overrideBrowserslist: ['last 10 version']
           }))
           .pipe(csscomb())
           .pipe(sourcemaps.write('.'))
           .pipe(dest('app/css'))
           .pipe(browserSync.stream())
}

//Building
//Create build project
function build(){
    return src([
        'app/css/style.min.css',
        'app/css/style.css',
        'app/fonts/**/*',
        'app/js/*.js',
        'app/img/**/*',
        'app/template/layout.html',
        'app/*.html'
    ], {base: 'app'})
    .pipe(dest('dist/'))
}
//Create build project with min all files
function buildMin(){
    htmlMin();
    return src([
        'app/css/style.min.css',
        'app/fonts/**/*',
        'app/js/main.min.js',
        'app/img/**/*',
    ], {base: 'app'})
    .pipe(dest('minDist/'))
}

//Archives files from dist
function zipBuild(){
    return src('./dist/**/*')
            .pipe(zip('project.zip'))
            .pipe(dest('dist'))
}

//Watch
function watching(){
    watch(['app/scss/**/*.scss'], styles)
    watch(['app/scss/**/*.scss'], stylesMin)
    watch(['app/*.html']).on('change', browserSync.reload)
    watch(['app/ts/**/*.ts', '!app/js/main.js', '!app/js/main.min.js'], scripts)
    watch(['app/js/main.js'], scriptsMin)
    watch(['app/pug/**/*.pug'], view)
}

exports.styles = styles;
exports.stylesMin = stylesMin;
exports.scripts = scripts;
exports.scriptsMin = scriptsMin;
exports.htmlMin = htmlMin;
exports.buildMin = buildMin;
exports.build = build;
exports.view = view;
exports.csscomb = csscomb;
exports.zipBuild = zipBuild;
exports.plumber = plumber;
exports.watching = watching;
exports.bs = bs;

exports.default = parallel(bs, watching);