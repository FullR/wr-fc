var glob = require("glob");
var path = require("path");
var Q = require("q");
var _ = require("lodash");
var exists = require("fs").existsSync;

Array.prototype.last = function() {
    return this[this.length-1];
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

var parts = levels.reduce((partList, level) => {
    return partList.concat(level.parts, level.words);
}, []);

var masterList = _.values(parts.reduce((index, part) => {
    index[part.key] = part;
    return index;
}, {}));

function isntWord(part) {
    return part.type !== "word";
}

masterList
    .forEach((part) => {
        var baseName = part.soundFile.split("/").last();
        var filename = path.resolve(`${__dirname}/../audio/${baseName}`);
        if(!exists(filename)) {
            console.log(baseName);
        }
    });

masterList
    .filter(isntWord)
    .forEach((part) => {
        var baseName = part.definitionSoundFile.split("/").last();
        var filename = path.resolve(`${__dirname}/../audio/${baseName}`);
        if(!exists(filename)) {
            console.log(baseName);
        }
    });