/*
    Builds Windows and Mac versions of the app
*/

module.exports = function() {
    var Builder = require("node-webkit-builder"),
        gutil   = require("gulp-util"),
        config  = require("../config");

    var builder = new Builder({
        files: ["./dist/**/!(*.mp3)"], // Ignore MP3s since the windows version only uses OGGs
        cacheDir: config.projectDir + "/.node-webkit-cache",
        buildDir: config.projectDir + "/builds/desktop",
        platforms: ["win"]
    });

    builder.on("log", function(data) {
        gutil.log(data);
    });

    return builder.build();
};