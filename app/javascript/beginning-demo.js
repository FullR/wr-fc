const Dictionary = require("dictionary");
const setup = require("setup");

// these values will be attached to the window object 
// since they change depending on the level
// this allows me to use different dictionaries and level objects
// between the different levels
setup({
    level: {
        id: "beginning-demo",
        title: "Beginning",
        ISBN: "978-1-60144-667-1",
        href: "http://www.criticalthinking.com/word-roots-beginning-flashcards-software.html",
        demo: true,
        demoChoices: {
            "1": [
                "prefix-con",
                "prefix-re",
                "root-scope",
                "root-phob",
                "suffix-ible",
                "suffix-ation"
            ],
            "2": [
                "prefix-op",
                "prefix-inter",
                "root-bat",
                "root-medi",
                "suffix-tiful",
                "suffix-or"
            ],
            "3": [
                "word-quietly",
                "word-bicycle",
                "word-audiologist",
                "word-dictionary"
            ],
            "4": [
                "word-graduation",
                "word-complete",
                "word-inflexible",
                "word-preservation"
            ]
        }
    },
    dictionary: new Dictionary({
        parts: require("words/beginning/parts"),
        words: require("words/beginning/words")
    })
});
