var Q = require("q");
var _ = require("lodash");
var exists = require("fs").existsSync;

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

_.each(levels, function(dict, levelName) {
    console.log("\n--- " + levelName + " ---");

    // check part sounds
    dict.parts.concat(dict.words).forEach(function(part) {
        var cwd = "/home/james/projects/WR-FC/statics/"+levelName+"/assets/audio/";
        var soundPath = cwd + part.soundFile + ".ogg";
        var defSoundPath = cwd + part.definitionSoundFile + ".ogg";
        if(!exists(soundPath)) {
            console.log(part.key);
        }
        if(part.definitionSoundFile && !exists(defSoundPath)) {
            console.log(part.key + " - Definition");
        }
    });
});