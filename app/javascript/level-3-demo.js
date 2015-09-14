const ready = require("polyfills/cordova/device-ready");
const {wait} = require("./util");

Promise.all([ready, wait(3000)]).then(() => {
    const Dictionary = require("dictionary");
    const setup = require("setup");

    setup({
        level: {
            id: "level-3-demo",
            levelId: "level-3",
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
}).catch((error) => {
    console.log(`---- ERROR: ${error.stack}`);
});
