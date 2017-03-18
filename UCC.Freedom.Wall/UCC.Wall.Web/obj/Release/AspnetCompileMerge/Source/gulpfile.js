/// <binding AfterBuild='bundle' />
var ts = require('gulp-typescript');
var gulp = require('gulp');
var clean = require('gulp-clean');
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var tsify = require("tsify");
var buffer = require("vinyl-buffer");
var uglify = require("gulp-uglify");
var destPath = './libs/';

// Delete the dist directory
gulp.task('clean', function () {
    return gulp.src(destPath)
        .pipe(clean());
});

gulp.task("scriptsNStyles", () => {
    gulp.src([
            'core-js/client/**',
            'systemjs/dist/system.src.js',
            'reflect-metadata/**',
            'rxjs/**',
            'zone.js/dist/**',
            '@angular/**',
            'jquery/dist/jquery.*js',
            'bootstrap/dist/js/bootstrap.*js'
    ], {
        cwd: "node_modules/**"
    })
        .pipe(gulp.dest("./libs"));
});

var tsProject = ts.createProject('TypeScripts/tsconfig.json', {
    typescript: require('typescript')
});
gulp.task('ts', function (done) {
    //var tsResult = tsProject.src()
    var tsResult = gulp.src([
            "TypeScripts/*.ts"
    ])
        .pipe(ts(tsProject), undefined, ts.reporter.fullReporter());
    return tsResult.js.pipe(gulp.dest('./App'));
});


gulp.task("bundle", function (done) {
    return browserify("./TypeScripts/main.ts")
        .plugin("tsify", {
            emitDecoratorMetadata: true,
            experimentalDecorators: true,
            module: "commonjs",
            noEmitOnError: true,
            noImplicitAny: false,
            target: "es5",
            moduleResolution: "node"
        })
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest("./App"));
});

gulp.task('watch', ['watch.ts']);

gulp.task('watch.ts', ['ts'], function () {
    return gulp.watch('TypeScripts/*.ts', ['ts']);
});

gulp.task('default', ['scriptsNStyles', 'watch']);