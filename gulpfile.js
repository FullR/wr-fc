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
var upload = require("./scripts/upload");
var pkg = require("./package");
var colors = {
    time: gutil.colors.magenta,
    taskName: gutil.colors.cyan,
    errors: gutil.colors.red.underline
};
var ids = {
    "beginning": "com.criticalthinking.wordrootsfcbeg",
    "level-1": "com.criticalthinking.wordrootsfc1",
    "level-2": "com.criticalthinking.wordrootsfc2",
    "level-3": "com.criticalthinking.wordrootsfc3"
};
var titles = {
    "beginning": "Word Roots Beginning Flashcards",
    "level-1": "Word Roots Level 1 Flashcards",
    "level-2": "Word Roots Level 2 Flashcards",
    "level-3": "Word Roots Level 3 Flashcards"
};

// command line arguments
var watch = process.argv.indexOf("--watch") !== -1;
var release = process.argv.indexOf("--release") !== -1;
var levels = ["beginning", "level-1", "level-2", "level-3"];

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
    function copy(target, destination) {
        return exec("cp -R " + target + " " + destination);
    }
    return function() {
        return copy("statics/"+level+"/*", "dist/"+level)
            .then(function() {
                return copy("statics/all/*", "dist/"+level);
            });
    };
}

function cordova(level) {
    var cordovaBuilder = require("./scripts/cordova-builder");
    var splash = "www/assets/images/splash.png";
    var icon = "www/assets/images/icon.png";

    return function() {
        return cordovaBuilder({
            verbose: true,
            name: titles[level],
            version: pkg.version,
            id: ids[level],
            dest: __dirname + "/cordova-"+level,
            src: __dirname + "/dist/"+level,
            merge: __dirname + "/cordova-merges",
            platforms: ["ios"],
            plugins: [
                "org.apache.cordova.media",
                "org.apache.cordova.console",
                "https://github.com/katzer/cordova-plugin-hidden-statusbar-overlay", // since fullscreen no longer works in iOS
                "org.apache.cordova.splashscreen",
                "org.apache.cordova.inappbrowser"
            ],
            preferences: [
                '<preference name="Orientation" value="landscape" />',
                '<preference name="Fullscreen" value="true" />',
                '<preference name="DisallowOverscroll" value="true" />',
                '<preference name="webviewbounce" value="false" />',
                '<gap:config-file platform="ios" parent="UIViewControllerBasedStatusBarAppearance" overwrite="true">',
                '    <false/>',
                '</gap:config-file>',
                '<preference name="SplashScreen" value="'+splash+'" />',
                '<icon src="'+icon+'" />',
                '<preference name="EnableViewportScale" value="true"/>'
            ],
            author: {
                name: "James Meyers",
                email: "JimmyM@criticalthinking.com"
            }
        });
    };
}

// Build tasks handle html, scss, js, etc
gulp.task("build", build());

// Bundle tasks just handle javascript bundling
gulp.task("bundle", ["bundle:beginning", "bundle:level-1", "bundle:level-2", "bundle:level-3"]);

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

// Upload
gulp.task("upload", ["build"], function() {
    upload();
});

// Cordova
gulp.task("cordova", ["cordova:beginning", "cordova:level-1", "cordova:level-2", "cordova:level-2"]);

levels.forEach(function(level) {
    gulp.task("build:" + level, build(level));
    gulp.task("bundle:" + level, bundleLevel(level));
    gulp.task("statics:" + level, statics(level));
    gulp.task("upload:" + level, ["build:"+level], upload.bind(null, level));
    gulp.task("cordova:" + level, ["build:"+level], cordova(level));
});

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

gulp.task("generate:word-lists", require("./scripts/build-word-lists"));

gulp.task("watch", function() {
    gulp.watch("app/styles/**/*.scss", ["sass"]);
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
