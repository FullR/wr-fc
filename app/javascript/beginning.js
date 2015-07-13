const ready = require("polyfills/cordova/device-ready");

ready.then(() => {
    const Dictionary = require("dictionary");
    const setup = require("setup");
    console.log("deviceready fired");

    setup({
        level: {
            id: "beginning",
            levelId: "beginning",
            title: "Beginning",
            ISBN: "978-1-60144-667-1",
            href: "http://www.criticalthinking.com/word-roots-beginning-flashcards-software.html"
        },
        dictionary: new Dictionary({
            parts: require("words/beginning/parts"),
            words: require("words/beginning/words")
        })
    });
}).catch((error) => {
    console.log(`--- ERROR: ${error} ${error.stack}`);
});

