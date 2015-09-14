const ready = require("polyfills/cordova/device-ready");
const {wait} = require("./util");

Promise.all([ready, wait(3000)]).then(() => {
    const Dictionary = require("dictionary");
    const setup = require("setup");

    setup({
        level: {
            id: "level-2",
            levelId: "level-2",
            title: "Level 2",
            ISBN: "978-1-60144-669-5",
            href: "http://www.criticalthinking.com/word-roots-level2-flashcards-software.html"
        },
        dictionary: new Dictionary({
            parts: require("words/level-2/parts"),
            words: require("words/level-2/words")
        })
    });
}).catch((error) => {
    console.log(`---- ERROR: ${error.stack}`);
});
