const {src, dest, watch, parallel } = require("gulp");

// CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
 
// Imagenes

const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache')
const webp = require('gulp-webp');
const avif = require('gulp-avif');
 
 function css(cb){
     
    src("src/scss/**/*.scss") // Identificar el archivo SAAS
    .pipe(plumber())         //compilarlo
    .pipe(sass())            //compilarlo
    .pipe(dest("build/css"));// Almacenarla en el disco duro 

    cb(); //Callback que avisa a gulp cuando llegamos al final
 }

 function versionWebp(done){
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,PNG,jpg,JPG}')
    .pipe(webp(opciones))
    .pipe(dest('build/img'));
    
    done();
 }
 function versionAvif(done){
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,PNG,jpg,JPG}')
    .pipe(avif(opciones))
    .pipe(dest('build/img'));
    
    done();
 }

 function imagenes(done){
    const opciones =  {
        optimizationLevel: 3
    }

    src('src/img/**/*.{png,PNG,jpg,JPG}')
    .pipe(cache(imagemin(opciones)))
    .pipe(dest('build/img'));

    done();
 }
function javascript(done){
    src('src/js/**/*.js')
    .pipe(dest('build/js'));

    done()
}


function dev(cb){
    watch("src/scss/**/*.scss",css);
    watch("src/js/**/*.js",javascript);

    cb();
}

exports.css = css;
exports.js = javascript
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript,dev);
 

 