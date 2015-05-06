var Q = require("q");
var _ = require("lodash");
var exists = require("fs").existsSync;

Array.prototype.last = function() {
    return this[this.length - 1];
};

Array.prototype.first = function() {
    return this[0];
};

var levels = {
    "beginning": {
        parts: require("../app/javascript/words/beginning/parts"),
        words: require("../app/javascript/words/beginning/words")
    },
    "level-1": {
        parts: require("../app/javascript/words/level-1/parts"),
        words: require("../app/javascript/words/level-1/words")
    },
    "level-2": {
        parts: require("../app/javascript/words/level-2/parts"),
        words: require("../app/javascript/words/level-2/words")
    },
    "level-3": {
        parts: require("../app/javascript/words/level-3/parts"),
        words: require("../app/javascript/words/level-3/words")
    }
};
var level = process.argv[2];

if(level) {
    if(!levels[level]) {
        console.log(level + " is not a valid level");
    }
    else {
        checkLevel(levels[level], level);
    }
}
else {
    _.each(levels, checkLevel);
}

function last(arr) { return arr[arr.length - 1]; }
function propEq(key, value) {
    return function(obj) {
        return obj[key] === value;
    };
}

function checkLevel(dict, levelName) {
    var cwd = "/home/james/projects/WR-FC/statics/"+levelName+"/assets/audio/";

    // check part sounds
    var missingParts = dict.parts.concat(dict.words)
        .filter(function(part) {
            return !exists(cwd + part.soundFile + ".ogg");
        })
        .map(function(part) {
            return part.soundFile.split("/").last();
        });

    var missingDefinitions = dict.parts
        .filter(function(part) {
            return !exists(cwd + part.definitionSoundFile + ".ogg");
        })
        .map(function(part) {
            return part.definitionSoundFile.split("/").last();
        });

    if(missingParts.length || missingDefinitions.length) {
        console.log("<h2>" + levelName + "</h2>");
        if(missingParts.length) {
            console.log("<h3>Parts/Words</h3>");
            missingParts.forEach(function(part) {
                console.log("<p>" + part + "</p>");
            });
        }

        if(missingDefinitions.length) {
            console.log("<h3>Definitions</h3>");
            missingDefinitions.forEach(function(def) {
                console.log("<p>" + def + "</p>");
            });
        }
        console.log("<hr/>");
    }
}