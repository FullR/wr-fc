var Dictionary = require("dictionary");
var setup = require("setup");

// these values will be attached to the window object 
// since they change depending on the level
// this allows me to use different dictionaries and level objects
// between the different levels
setup({
    level: {
        title: "Beginning",
        ISBN: "978-1-60144-667-1"
    },
    dictionary: new Dictionary({
        parts: require("words/beginning/parts"),
        words: require("words/beginning/words")
    })
});
