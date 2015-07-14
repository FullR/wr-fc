var gulp = require("gulp");
var gutil = require("gulp-util");
var _ = require("lodash");
var Q = require("q");
var exec = Q.nfbind(require("child_process").exec);
var spawn = require("child_process").spawn;
var plumber = require("gulp-plumber");
var runSequence = require("run-sequence");
var buffer = require("vinyl-buffer");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var upload = require("./scripts/upload");
var pkg = require("./package");
var Browserify = require("browserify");
var source  = require("vinyl-source-stream");
var watchify = require("watchify");

// command line arguments
var watch = process.argv.indexOf("--watch") !== -1;
var release = process.argv.indexOf("--release") !== -1;

var colors = {
    time: gutil.colors.magenta,
    taskName: gutil.colors.cyan,
    errors: gutil.colors.red.underline
};

var ids = {
    "beginning": "com.criticalthinking.wordrootsfcbeg",
    "level-1": "com.criticalthinking.wordrootsfc1",
    "level-2": "com.criticalthinking.wordrootsfc2",
    "level-3": "com.criticalthinking.wordrootsfc3",
    "beginning-demo": "com.criticalthinking.wordrootsfcbegdemo",
    "level-1-demo": "com.criticalthinking.wordrootsfc1demo",
    "level-2-demo": "com.criticalthinking.wordrootsfc2demo",
    "level-3-demo": "com.criticalthinking.wordrootsfc3demo"
};

var titles = {
    "beginning": "Word Roots Beginning Flashcards",
    "level-1": "Word Roots Level 1 Flashcards",
    "level-2": "Word Roots Level 2 Flashcards",
    "level-3": "Word Roots Level 3 Flashcards",
    "beginning-demo": "Word Roots Beginning Flashcards Demo",
    "level-1-demo": "Word Roots Level 1 Flashcards Demo",
    "level-2-demo": "Word Roots Level 2 Flashcards Demo",
    "level-3-demo": "Word Roots Level 3 Flashcards Demo"
};

var levels = [
    "beginning",
    "level-1",
    "level-2",
    "level-3",
    "beginning-demo",
    "level-1-demo",
    "level-2-demo",
    "level-3-demo"
];

require("babel/register");

function bundleLevel(level) {
    var bundler;

    if(watch) {
        bundler = watchify(Browserify(_.extend({
            paths: [
                "./node_modules",
                "./app/javascript",
                "./lib"
            ],
            debug: !release
        }, watchify.args)))
        .on("time", function(time) {
            gutil.log("Finished '"+colors.taskName("bundle:"+level)+"' after " + colors.time(time + " ms"));
        })
        .on("update", bundle)
        .add("./app/javascript/"+level+".js")
        .transform(require("babelify"))
        .transform("brfs");
    }
    else {
        bundler = Browserify({
            paths: ["./node_modules", "./app/javascript", "./lib"],
            debug: !release
        })
        .add("./app/javascript/"+level+".js")
        .transform(require("babelify"))
        .transform("brfs");
    }

    function bundle() {
        var stream = bundler
            .bundle()
            .on("error", function(error) {
                gutil.log(colors.errors("Bundler Error:\n") + error.toString());
            })
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
            level ? "generate:word-audio:"+level : "generate:word-audio",
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

    return function() {
        return cordovaBuilder({
            verbose: true,
            name: titles[level],
            version: pkg.version,
            id: ids[level],
            dest: __dirname + "/cordova-builds/" + level,
            src: __dirname + "/dist/" + level,
            merge: __dirname + "/cordova-merges/all",
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
                '<splash src="www/assets/splashscreens/Default-Landscape.png" width="1024" height="768"/>',
                '<splash src="www/assets/splashscreens/Default-Landscape@2x.png" width="2048" height="1536"/>',
                '<splash src="www/assets/splashscreens/Default-Landscape-736h@3x.png" width="2208" height="1242"/>',
                '<preference name="SplashScreenDelay" value="5000" />',
                '<icon src="www/assets/images/icon.png" />',
                '<preference name="EnableViewportScale" value="true"/>'
            ],
            author: {
                name: "James Meyers",
                email: "JimmyM@criticalthinking.com"
            }
        });
    };
}

function desktop(level) {
    return function() {
        var NwBuilder = require("node-webkit-builder");
        var nw = new NwBuilder({
            version: "0.12.1",
            macIcns: "./statics/"+level+"/assets/icon.icns",
            files: "./dist/"+level+"/**/!(*.mp3)",
            platforms: ["osx32", "osx64", "win32", "win64"],
            buildDir: "./desktop-builds",
            macZip: true
        });

        nw.on("log", console.log.bind(console));
        return nw.build();
    };
}

function ios(level) {
    return function() {
        //return exec("cordova run ios --device", {cwd: "./cordova-builds/"+level, maxBuffer: Infinity, stdio: "inherit"});
        spawn("cordova", ["run", "ios", "--device"], {cwd: "./cordova-builds/"+level, stdio: "inherit"});
    };
}

// Build tasks handle html, scss, js, etc
gulp.task("build", build());

// Bundle tasks just handle javascript bundling
gulp.task("bundle", function(callback) {
    runSequence(
        "bundle:beginning",
        "bundle:level-1",
        "bundle:level-2",
        "bundle:level-3",
        "bundle:beginning-demo",
        "bundle:level-1-demo",
        "bundle:level-2-demo",
        "bundle:level-3-demo",
        callback);
});

// Static images, sounds, fonts, etc.
gulp.task("statics", function(callback) {
    runSequence(
        "statics:beginning",
        "statics:level-1",
        "statics:level-2",
        "statics:level-3",
        "statics:beginning-demo",
        "statics:level-1-demo",
        "statics:level-2-demo",
        "statics:level-3-demo",
        callback);
});

// Cordova
gulp.task("cordova", function(callback) {
    runSequence(
        "cordova:beginning",
        "cordova:level-1",
        "cordova:level-2",
        "cordova:level-3",
        "cordova:beginning-demo",
        "cordova:level-1-demo",
        "cordova:level-2-demo",
        "cordova:level-3-demo",
        callback);
});

gulp.task("desktop", function(callback) {
    runSequence(
        "desktop:beginning",
        "desktop:level-1",
        "desktop:level-2",
        "desktop:level-3",
        "desktop:beginning-demo",
        "desktop:level-1-demo",
        "desktop:level-2-demo",
        "desktop:level-3-demo",
        callback);
});

// Upload
gulp.task("upload", ["build"], function() {
    return upload();
});

gulp.task("sass", function() {
    var sass = require("gulp-ruby-sass");

    return gulp.src("app/styles/app.scss")
        .pipe(plumber())
        .pipe(sass({style: "compressed", require: ["susy"]}))
        .pipe(gulp.dest("dist/beginning/assets"))
        .pipe(gulp.dest("dist/level-1/assets"))
        .pipe(gulp.dest("dist/level-2/assets"))
        .pipe(gulp.dest("dist/level-3/assets"))
        .pipe(gulp.dest("dist/beginning-demo/assets"))
        .pipe(gulp.dest("dist/level-1-demo/assets"))
        .pipe(gulp.dest("dist/level-2-demo/assets"))
        .pipe(gulp.dest("dist/level-3-demo/assets"));
});

gulp.task("html", function() {
    return gulp.src("app/index.html")
        .pipe(gulp.dest("dist/beginning"))
        .pipe(gulp.dest("dist/level-1"))
        .pipe(gulp.dest("dist/level-2"))
        .pipe(gulp.dest("dist/level-3"))
        .pipe(gulp.dest("dist/beginning-demo"))
        .pipe(gulp.dest("dist/level-1-demo"))
        .pipe(gulp.dest("dist/level-2-demo"))
        .pipe(gulp.dest("dist/level-3-demo"));
});

gulp.task("generate:word-lists", require("./scripts/build-word-lists"));
gulp.task("generate:word-audio", function(callback) {
    runSequence(
        "generate:word-audio:beginning",
        "generate:word-audio:level-1",
        "generate:word-audio:level-2",
        "generate:word-audio:level-3",
        "generate:word-audio:beginning-demo",
        "generate:word-audio:level-1-demo",
        "generate:word-audio:level-2-demo",
        "generate:word-audio:level-3-demo",
        callback
    );
});

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

levels.forEach(function(level) {
    gulp.task("build:" + level, build(level));
    gulp.task("bundle:" + level, bundleLevel(level));
    gulp.task("statics:" + level, statics(level));

    gulp.task("desktop:" + level, ["build:"+level], desktop(level));
    gulp.task("upload:" + level, ["build:"+level], upload.bind(null, level));
    gulp.task("cordova:" + level, ["build:"+level], cordova(level));
    gulp.task("ios:" + level, ios(level));

    gulp.task("generate:word-audio:"+level, function() {
        return require("./scripts/build-audio-dirs")(level);
    });
});
