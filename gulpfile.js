var gulp = require("gulp");
var gutil = require("gulp-util");
var _ = require("lodash");
var Q = require("q");
var exec = Q.nfbind(require("child_process").exec);
var plumber = require("gulp-plumber");
var runSequence = require("run-sequence");
var buffer = require("vinyl-buffer");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var upload = require("scripts/upload");
var colors = {
    time: gutil.colors.magenta,
    taskName: gutil.colors.cyan,
    errors: gutil.colors.red.underline
};

// command line arguments
var watch = process.argv.indexOf("--watch") !== -1;
var release = process.argv.indexOf("--release") !== -1;

function bundleLevel(level) {
    var Browserify = require("browserify");
    var source  = require("vinyl-source-stream");
    var watchify = require("watchify");
    var bundler;

    if(watch) {
        bundler = watchify(Browserify(_.extend({
            paths: ["./node_modules", "./app/javascript", "./lib"],
            debug: !release
        }, watchify.args)))
        .on("time", function(time) {
            gutil.log("Finished '"+colors.taskName("bundle:"+level)+"' after " + colors.time(time + " ms"));
        })
        .on("update", bundle)
        .add("./app/javascript/"+level+".js");
    }
    else {
        bundler = Browserify({
            paths: ["./node_modules", "./app/javascript", "./lib"],
            debug: !release
        })
        .add("./app/javascript/"+level+".js");
    }

    function bundle() {
        var stream = bundler            
            .on("error", function(error) {
                gutil.log(colors.errors("Bundler Error:\n") + error.toString());
            })
            .transform(require("babelify"))
            .transform("brfs")
            .bundle()
            .pipe(source(level+".js"))
            .pipe(buffer())
            .pipe(rename("app.js"));

        if(release) {
            return stream.pipe(uglify()).pipe(gulp.dest("./dist/"+level+"/assets"));
        }
        return stream.pipe(gulp.dest("./dist/"+level+"/assets"));
    }

    return bundle;
}

function build(level) {
    return function(callback) {
        runSequence.apply(null, _.compact([
            ["html", "sass", "generate:word-lists"],
            level ? "bundle:" + level : "bundle",
            level ? "statics:" + level : "statics",
            watch ? "watch" : null,
            watch ? "serve" : null,
            callback
        ]));
    };
}

function statics(level) {
    return function() {
        return gulp.src(["statics/"+level+"/**/*", "statics/all/**/*"])
            .pipe(gulp.dest("dist/"+level));
    };
}

// Build tasks handle html, scss, js, etc
gulp.task("build", build());
gulp.task("build:beginning", build("beginning"));
gulp.task("build:level-1", build("level-1"));
gulp.task("build:level-2", build("level-2"));
gulp.task("build:level-3", build("level-3"));

// Bundle tasks just handle javascript bundling
gulp.task("bundle", ["bundle:beginning", "bundle:level-1", "bundle:level-2", "bundle:level-3"]);
gulp.task("bundle:beginning", bundleLevel("beginning"));
gulp.task("bundle:level-1", bundleLevel("level-1"));
gulp.task("bundle:level-2", bundleLevel("level-2"));
gulp.task("bundle:level-3", bundleLevel("level-3"));

// Statics
gulp.task("statics", function(callback) {
    runSequence(
        "statics:beginning",
        "statics:level-1",
        "statics:level-2",
        "statics:level-3",
        callback
    );
});
gulp.task("statics:beginning", statics("beginning"));
gulp.task("statics:level-1", statics("level-1"));
gulp.task("statics:level-2", statics("level-2"));
gulp.task("statics:level-3", statics("level-3"));

// Upload
gulp.task("upload", ["build"], function() {
    upload();
});
gulp.task("upload:beginning", ["build:beginning"], upload.bind(null, "beginning"));
gulp.task("upload:level-1", ["build:level-1"], upload.bind(null, "level-1"));
gulp.task("upload:level-2", ["build:level-2"], upload.bind(null, "level-2"));
gulp.task("upload:level-3", ["build:level-3"], upload.bind(null, "level-3"));

gulp.task("sass", function() {
    var sass = require("gulp-ruby-sass");

    return gulp.src("app/styles/app.scss")
        .pipe(plumber())
        .pipe(sass({style: "compressed", require: ["susy"]}))
        .pipe(gulp.dest("dist/beginning/assets"))
        .pipe(gulp.dest("dist/level-1/assets"))
        .pipe(gulp.dest("dist/level-2/assets"))
        .pipe(gulp.dest("dist/level-3/assets"));
});

gulp.task("html", function() {
    return gulp.src("app/index.html")
        .pipe(gulp.dest("dist/beginning"))
        .pipe(gulp.dest("dist/level-1"))
        .pipe(gulp.dest("dist/level-2"))
        .pipe(gulp.dest("dist/level-3"));
});

gulp.task("generate:word-lists", require("scripts/build-word-lists"));

gulp.task("watch", function() {
    gulp.watch("app/styles/**/*.scss", ["styles"]);
    gulp.watch("app/index.html", ["html"]);
});

gulp.task("serve", function() {
    var express = require("express");
    var app = express();
    var port = 4800;
    app.use(express.static("dist"));
    app.listen(port);
    gutil.log("Listening on port " + port);
});

gulp.task("default", ["build"]);