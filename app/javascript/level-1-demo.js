const ready = require("polyfills/cordova/device-ready");

ready.then(() => {
    const Dictionary = require("dictionary");
    const setup = require("setup");

    setup({
        level: {
            id: "level-1-demo",
            levelId: "level-1",
            title: "Level 1",
            ISBN: "978-1-60144-668-8",
            href: "http://www.criticalthinking.com/word-roots-level1-flashcards-software.html",
            demo: true,
            demoChoices: {
                "1": [
                    "prefix-infra",
                    "prefix-cor",
                    "root-herbi",
                    "root-dur",
                    "suffix-ary",
                    "suffix-ure"
                ],
                "2": [
                    "prefix-post",
                    "prefix-ultra",
                    "root-ceed",
                    "root-miss",
                    "suffix-ify",
                    "suffix-trix"
                ],
                "3": [
                    "word-brevity",
                    "word-deposit",
                    "word-destruction",
                    "word-imposition",
                    "word-irrevocable",
                    "word-eloquently"
                ],
                "4": [
                    "word-memory",
                    "word-secede",
                    "word-benevolent",
                    "word-herbivorous",
                    "word-bicentennial",
                    "word-reconstruction"
                ]
            }
        },
        dictionary: new Dictionary({
            parts: require("words/level-1/parts"),
            words: require("words/level-1/words")
        })
    });
}).catch((error) => {
    console.log(`--- ERROR: ${error} ${error.stack}`);
});
