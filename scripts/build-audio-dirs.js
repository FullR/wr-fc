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

var levels = ["beginning", "level-1", "level-2", "level-3", "beginning-demo", "level-1-demo", "level-2-demo", "level-3-demo"];
var levelIndexes = {
    "beginning": 0,
    "beginning-demo": 0,
    "level-1": 1,
    "level-1-demo": 1,
    "level-2": 2,
    "level-2-demo": 2,
    "level-3": 3,
    "level-3-demo": 3
};
function getLevel(levelId) {
    if(levels.indexOf(levelId) === -1) {
        throw new Error("Unrecognized level: " + levelId);
    }

    return {
        id: levelId,
        parts: require(`../app/javascript/words/${levelId}/parts`),
        words: require(`../app/javascript/words/${levelId}/words`)
    };
}

function getFilename(part, isDefinition) {
    return `${isDefinition ? "D" : ""}${part.type[0].toUpperCase()}-${part.id}`;
}

function getSourcePath(part, isDefinition) {
    var fileName = getFilename(part, isDefinition);
    return path.resolve(`${__dirname}/../audio/${fileName}`);
}

function getLevelSourcePath(level, part, isDefinition) {
    var fileName = getFilename(part, isDefinition);
    return path.resolve(`${__dirname}/../audio/${fileName}-${levelIndexes[level]}`);
}

function getDestinationPath(part, levelId, isDefinition) {
    return path.resolve(`${__dirname}/../statics/${levelId}/assets/audio/${isDefinition ? "definitions" : "word-parts"}/${part.type}/${getFilename(part, isDefinition)}`);
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

function buildLevelDir(level) {
    return level.parts.concat(level.words).reduce((promise, part) => {
        var source = getSourcePath(part, false);
        var levelSource = getLevelSourcePath(level, part, false);
        var dest = getDestinationPath(part, level.id, false);

        var defSource = getSourcePath(part, true);
        var levelDefSource = getLevelSourcePath(level.id, part, true);
        var defDest = getDestinationPath(part, level.id, true);

        return promise
            .then(() => createDir(dest.split("/").slice(0, -1).join("/")))
            .then(() => {
                if(part.type !== "word") {
                    return createDir(defDest.split("/").slice(0, -1).join("/"));
                }
            })
            .then(() => {
                var levelFile = levelSource + ".ogg";
                var file = source + ".ogg";
                if(exists(levelFile)) {
                    console.log("Using level specific ogg for: " + part.key);
                    return copy(levelFile, dest + ".ogg");
                }
                else if(exists(file)) {
                    return copy(file, dest.replace(/é/g, "e") + ".ogg");
                }
                else {
                    console.log("Missing: " + file);
                }
            })
            .then(() => {
                var levelFile = levelSource + ".mp3";
                var file = source + ".mp3";
                if(exists(levelFile)) {
                    console.log("Using level specific mp3 for: " + part.key);
                    return copy(levelFile, dest + ".mp3");
                }
                else if(exists(file)) {
                    return copy(file, dest.replace(/é/g, "e") + ".mp3");
                }
                else {
                    console.log("Missing: " + file);
                }
            })
            .then(() => {
                if(part.type === "word") return;

                var file = defSource + ".ogg";
                var levelFile = levelDefSource + ".ogg";
                if(exists(levelFile)) {
                    console.log("Using level specific definition ogg for: " + part.key);
                    return copy(levelFile, defDest + ".ogg");
                }
                else if(exists(file)) {
                    return copy(file, defDest + ".ogg");
                }
                else {
                    console.log("Missing: " + file);
                }
            })
            .then(() => {
                if(part.type === "word") return;

                var file = defSource + ".mp3";
                var levelFile = levelDefSource + ".mp3";
                if(exists(levelFile)) {
                    console.log("Using level specific definition mp3 for: " + part.key);
                    return copy(levelFile, defDest + ".mp3");
                }
                else if(exists(file)) {
                    return copy(file, defDest + ".mp3");
                }
                else {
                    console.log("Missing: " + file);
                }
            });
    }, Q.resolve()).catch((error) => console.log(error.toString()));
}

if(require.main === module) { 
    levels
        .map(getLevel)
        .forEach(buildLevelDir);
}

module.exports = function buildLevelDir_export(...levelIds) {
    return levelIds.reduce((promise, levelId) => {
        return promise.then(() => {
            return buildLevelDir(getLevel(levelId));
        });
    }, Q.resolve());
};