const ready = require("polyfills/cordova/device-ready");
const {wait} = require("./util");

Promise.all([ready, wait(3000)]).then(() => {
    const Dictionary = require("dictionary");
    const setup = require("setup");

    setup({
        level: {
            id: "level-3",
            levelId: "level-3",
            title: "Level 3",
            ISBN: "978-1-60144-670-1",
            href: "http://www.criticalthinking.com/word-roots-level3-flashcards-software.html"
        },
        dictionary: new Dictionary({
            parts: require("words/level-3/parts"),
            words: require("words/level-3/words")
        })
    });
}).catch((error) => {
    console.log(`---- ERROR: ${error.stack}`);
});
