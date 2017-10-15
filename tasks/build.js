const webserver = require('gulp-webserver');
const vfs = require("vinyl-fs");
const browserify = require("browserify");
const watchify = require("watchify");
const cssModulesify = require('css-modulesify');
const babelify = require('babelify');
const fs = require("fs");
const mkdirp = require('mkdirp');

const bundler = browserify({
                    entries: ["src/index.jsx"],
                    debug: true,
                    extensions: ['.js', '.jsx', '.css'],
                })
                .transform("babelify", {
                    presets: ["es2015", "react"]
                })
                .plugin(watchify);

bundler.plugin(cssModulesify,{
  rootDir: __dirname,
  output: './dist/test.css'
})

const rebundle = ()=>{
    const date = new Date();
    bundler
        .bundle()
        .on("error", (e)=>{
            console.log(e);
        })
        .on("end", ()=>{
            console.log(`[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] browserify compile success.`);
        })
        .pipe(fs.createWriteStream('dist/app.js'));
};

mkdirp('dist', function (err) {
    if (err) throw new Error(err)
    bundler.on("update", rebundle);
    rebundle();
    
    vfs.src("./")
        .pipe(webserver({
            port: 3000,
            livereload: true
        }));
});