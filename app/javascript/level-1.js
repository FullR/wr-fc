const ready = require("polyfills/cordova/device-ready");

// try {
//     const Dictionary = require("dictionary");
//     const setup = require("setup");

//     // these values will be attached to the window object 
//     // since they change depending on the level
//     // this allows me to use different dictionaries and level objects
//     // between the different levels
//     setup({
//         level: {
//             id: "level-1",
//             levelId: "level-1",
//             title: "Level 1",
//             ISBN: "978-1-60144-668-8",
//             href: "http://www.criticalthinking.com/word-roots-level1-flashcards-software.html"
//         },
//         dictionary: new Dictionary({
//             parts: require("words/level-1/parts"),
//             words: require("words/level-1/words")
//         })
//     });
// } catch(err) {
//     console.log("Failed to start application: " + err);
// }

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
    console.log(`--- ERROR: ${error} ${error.stack}`);
});