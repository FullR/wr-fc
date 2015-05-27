var Dictionary = require("dictionary");
var setup = require("setup");

// these values will be attached to the window object 
// since they change depending on the level
// this allows me to use different dictionaries and level objects
// between the different levels
setup({
    level: {
        id: "level-3",
        title: "Level 3",
        ISBN: "978-1-60144-670-1",
        href: "http://www.criticalthinking.com/word-roots-level3-flashcards-software.html"
    },
    dictionary: new Dictionary({
        parts: require("words/level-3/parts"),
        words: require("words/level-3/words")
    })
});
