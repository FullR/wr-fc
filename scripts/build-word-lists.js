var Q = require("q");
var _ = require("lodash");
var fs = require("fs");
var exec = Q.nfbind(require("child_process").exec);
var masterList = JSON.parse(fs.readFileSync(__dirname+"/../master-word-list.json"));//require("../master-word-list");
var mkdirp = Q.nfbind(require("mkdirp"));

function trim(s) {
    return s.trim();
}

function addPrefix(prefix) {
    return function(str) {
        return prefix + str;
    };
}

function fixId(level, id) {
    var key = masterList
        .filter(function(part) {
            return part.level === level && part.type !== "word" && part.id === id;
        })
        .map(function(part) {
            return part.key;
        })[0];

    return key;
}

function partExists(level, partKey) {
    return masterList.filter(function(word) {
        return word.level === level && word.type !== "word";
    }).some(function(word) {
        return word.key === partKey;
    });
}

function wordsWithPartExists(level, partKey) {
    return masterList.some(function(word) {
        return word.level === level && 
               word.type === "word" && 
               word.prefixes
                    .concat(word.roots)
                    .concat(word.suffixes)
                    .indexOf(partKey) !== -1;
    });
}

function remove(c) {
    return function(str) {
        return str.replace(c, "");
    };
}

function fixWords() {
    masterList.forEach(function(word) {
        var level = word.level;
        word.id = word.id.trim();
        word.definition = word.definition.trim();
        word.key = word.type + "-" + word.id;
        word.soundFile = "word-parts/"+word.type+"/"+word.type[0].toUpperCase() + "-" + word.id;

        if(word.id === "per capita") {
            word.space = true;
        }

        if(word.type === "word") {
            word.prefixes = word.prefixes.map(trim).map(addPrefix("prefix-"));
            word.roots = word.roots.map(trim).map(addPrefix("root-"));
            word.suffixes = word.suffixes.map(trim).map(addPrefix("suffix-"));
        }
        else {
            word.definitionSoundFile = "definitions/"+word.type+"/D"+word.type[0].toUpperCase() + "-" + word.id;
        }
    });

    masterList.forEach(function(word) {
        var level = word.level;

        if(word.type === "word") {
            word.choosableParts = word.choosableParts
                .map(function(partId) { 
                    return partId.replace(/-|–/, ""); 
                })
                .map(trim)
                .map(function(id) {
                    var key = fixId(level, id);
                    if(!key) {
                        console.log("Level " + level + " " + word.key+" contains invalid part: choosablePart-" + id);
                    }
                    return key;
                })
                .filter(function(id) {
                    return !!id;
                });

            [].concat(word.prefixes).concat(word.roots).concat(word.suffixes).forEach(function(partId) {
                if(!partExists(level, partId)) {
                    console.log("Level " + level + " " + word.key + " contains invalid part: " + partId);
                }
            });
        }
        else {
            if(!wordsWithPartExists(level, word.key)) {
                console.log("Level " + level + " " + "No words contain part: " + word.key);
            }
        }
    });
}

function getLevelWords(level) {
    var levelWords = masterList.filter(function(word) {
        return word.level === level;
    });

    return {
        words: levelWords.filter(function(word) {
            return word.type === "word";
        }),
        parts: levelWords.filter(function(word) {
            return word.type !== "word";
        })
    };
}

var mergeDirectories = {
    "0": __dirname + "/../merges/beginning",
    "1": __dirname + "/../merges/level-1",
    "2": __dirname + "/../merges/level-2",
    //"3": __dirname + "/../merges/level-3"
};

var audioPrefixes = {
    "prefix": "P-",
    "root": "R-",
    "suffix": "S-",
    "word": "W-"
};

function check(levelObj) {
    var words = levelObj.words,
        parts = levelObj.parts;

    function partExists(partId) {
        return parts.some(function(part) {
            return part.key === partId;
        });
    }

    ["prefixes", "roots", "suffixes", "choosableParts"].forEach(function(field) {
        words.forEach(function(word) {
            word[field].forEach(function(partId) {
                if(!partExists(partId)) {
                    console.log("("+field+") '" + partId + "' not found in '"+word.key+"'");
                }
            });
        });
    });
}

function saveWordList(path, wordList) {
    fs.writeFileSync(path, "module.exports = " + JSON.stringify(wordList, null, 4) + ";\n");
}

module.exports = function() {
    var level0;
    var level1;
    var level2;
    //var level3;
    fixWords();

    level0 = getLevelWords(0);
    level1 = getLevelWords(1);
    level2 = getLevelWords(2);
    //level3 = getLevelWords(3);

    /*console.log("-- Beginning --");
    check(level0);
    console.log("\n");

    console.log("-- Level 1 --");
    check(level1);
    console.log("\n");*/

    console.log("-- Level 2 --");
    check(level2);
    console.log("\n");

    /*console.log("-- Level 3 --");
    check(level3);
    console.log("\n");*/

    saveWordList(__dirname + "/../app/javascript/words/beginning/words.js", level0.words);
    saveWordList(__dirname + "/../app/javascript/words/beginning/parts.js", level0.parts);

    saveWordList(__dirname + "/../app/javascript/words/level-1/words.js", level1.words);
    saveWordList(__dirname + "/../app/javascript/words/level-1/parts.js", level1.parts);

    saveWordList(__dirname + "/../app/javascript/words/level-2/words.js", level2.words);
    saveWordList(__dirname + "/../app/javascript/words/level-2/parts.js", level2.parts);

    //saveWordList(__dirname + "/../app/javascript/words/level-3/words.js", level3.words);
    //saveWordList(__dirname + "/../app/javascript/words/level-3/parts.js", level3.parts);

    //buildMasterList();
    //buildLevelLists();
};
