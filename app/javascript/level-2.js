var Dictionary = require("dictionary");
var setup = require("setup");

// these values will be attached to the window object 
// since they change depending on the level
// this allows me to use different dictionaries and level objects
// between the different levels
setup({
    level: {
        title: "Level 2",
        ISBN: "978-1-60144-669-5"
    },
    dictionary: new Dictionary({
        parts: require("words/level-2/parts"),
        words: require("words/level-2/words")
    })
});
