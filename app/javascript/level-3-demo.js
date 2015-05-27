var Dictionary = require("dictionary");
var setup = require("setup");

// these values will be attached to the window object 
// since they change depending on the level
// this allows me to use different dictionaries and level objects
// between the different levels
setup({
    level: {
        id: "level-3-demo",
        title: "Level 3",
        ISBN: "978-1-60144-670-1",
        href: "http://www.criticalthinking.com/word-roots-level3-flashcards-software.html",
        demo: true,
        demoChoices: {
            "1": [
                "prefix-hypo",
                "prefix-an",
                "root-arch",
                "root-mis",
                "suffix-logy",
                "suffix-ic"
            ],
            "2": [
                "prefix-anti",
                "prefix-sym",
                "root-psych",
                "root-agro",
                "suffix-y",
                "suffix-sis"
            ],
            "3": [
                "word-bipod",
                "word-monolog",
                "word-ideocracy",
                "word-encephalitis",
                "word-autobiography",
                "word-antisymmetric"
            ],
            "4": [
                "word-micrometer",
                "word-metric",
                "word-synchronous",
                "word-heliocentric",
                "word-telethermometry",
                "word-antisymmetry"
            ]
        }
    },
    dictionary: new Dictionary({
        parts: require("words/level-3/parts"),
        words: require("words/level-3/words")
    })
});
