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
        index: 0,
        id: "beginning",
        parts: require("../app/javascript/words/beginning/parts"),
        words: require("../app/javascript/words/beginning/words")
    }, {
        index: 1,
        id: "level-1",
        parts: require("../app/javascript/words/level-1/parts"),
        words: require("../app/javascript/words/level-1/words")
    }, {
        index: 2,
        id: "level-2",
        parts: require("../app/javascript/words/level-2/parts"),
        words: require("../app/javascript/words/level-2/words")
    }, {
        index: 3,
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

function checkParts(levelId) {
    var level = arguments.length ? 
        levels.filter((level) => level.id === levelId)[0] : 
        null;

    var list = level ? 
        level.parts.concat(level.words) : 
        masterList;

    list
        .forEach((part) => {
            var baseName = part.soundFile.split("/").last();
            var filename = path.resolve(`${__dirname}/../audio/${baseName}.ogg`);
            if(!exists(filename)) {
                console.log(baseName);
            }
        });

    list
        .filter(isntWord)
        .forEach((part) => {
            var baseName = part.definitionSoundFile.split("/").last();
            var filename = path.resolve(`${__dirname}/../audio/${baseName}.ogg`);
            if(!exists(filename)) {
                console.log(baseName);
            }
        });
}

if(require.main === module) { 
    checkParts(process.argv[2]);
}

module.exports = checkParts;