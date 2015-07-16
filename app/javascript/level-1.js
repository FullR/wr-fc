const ready = require("polyfills/cordova/device-ready");

ready.then(() => {
    const Dictionary = require("dictionary");
    const setup = require("setup");
    console.log("deviceready fired");

    setup({
        level: {
            id: "level-1",
            levelId: "level-1",
            title: "Level 1",
            ISBN: "978-1-60144-668-8",
            href: "http://www.criticalthinking.com/word-roots-level1-flashcards-software.html"
        },
        dictionary: new Dictionary({
            parts: require("words/level-1/parts"),
            words: require("words/level-1/words")
        })
    });
}).catch((error) => {
    console.log(`---- ERROR: ${error.stack}`);
});