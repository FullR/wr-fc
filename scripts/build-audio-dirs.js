var glob = require("glob");
var path = require("path");
var Q = require("q");
var _ = require("lodash");
var exists = require("fs").existsSync;
var exec = Q.nfbind(require("child_process").exec);
var mkdirp = Q.nfbind(require("mkdirp"));

function copy(a, b) {
    return exec(`cp '${a}' '${b}'`);
}

function remove(dir) {
    return exec(`rm -rf '${dir}'`);
}

var levels = [
    {
        id: "beginning",
        parts: require("../app/javascript/words/beginning/parts"),
        words: require("../app/javascript/words/beginning/words")
    }, {
        id: "level-1",
        parts: require("../app/javascript/words/level-1/parts"),
        words: require("../app/javascript/words/level-1/words")
    }, {
        id: "level-2",
        parts: require("../app/javascript/words/level-2/parts"),
        words: require("../app/javascript/words/level-2/words")
    }, {
        id: "level-3",
        parts: require("../app/javascript/words/level-3/parts"),
        words: require("../app/javascript/words/level-3/words")
    }
];

function getSourcePath(part, isDefinition) {
    var fileName = `${isDefinition ? "D" : ""}${part.type[0].toUpperCase()}-${part.id}`;
    return path.resolve(`${__dirname}/../audio/${fileName}`);
}

function getDestinationPath(part, levelId, isDefinition) {
    return path.resolve(`${__dirname}/../statics/${levelId}/assets/audio/${isDefinition ? "definitions" : "word-parts"}/${part.type}`);
}

var dirCreatedCache = new Set();
function createDir(path) {
    if(dirCreatedCache.has(path)) {
        return Q.resolve();
    }
    else {
        dirCreatedCache.add(path);
        return mkdirp(path);
    }
}


levels.forEach((level) => {
    level.parts.concat(level.words).reduce((promise, part) => {
        var source = getSourcePath(part, false);
        var dest = getDestinationPath(part, level.id, false);

        var defSource = getSourcePath(part, true);
        var defDest = getDestinationPath(part, level.id, true);

        return promise
            .then(() => createDir(dest))
            .then(() => {
                if(part.type !== "word") {
                    return createDir(defDest);
                }
            })
            .then(() => {
                var file = source + ".ogg";
                if(exists(file)) {
                    return copy(file, dest);
                }
                else {
                    console.log("Missing: " + file);
                }
            })
            .then(() => {
                var file = source + ".mp3";
                if(exists(file)) {
                    return copy(file, dest);
                }
                else {
                    console.log("Missing: " + file);
                }
            })
            .then(() => {
                if(part.type === "word") return;

                var file = defSource + ".ogg";
                if(exists(file)) {
                    return copy(file, defDest);
                }
                else {
                    console.log("Missing: " + file);
                }
            })
            .then(() => {
                if(part.type === "word") return;

                var file = defSource + ".mp3";
                if(exists(file)) {
                    return copy(file, defDest);
                }
                else {
                    console.log("Missing: " + file);
                }
            });
    }, Q.resolve()).catch((error) => console.log(error.toString()));
});