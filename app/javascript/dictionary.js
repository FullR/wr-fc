const _ = require("lodash");

// edge case flags go here
const additionalProps = {
    "word-per capita": { // only word with a space in it
        spacing: true
    }
};

const byType = (type) => ((part) => part.type === type);
function Dictionary(options) {
    const {words, parts} = options;
    words.forEach((word) => {
        word.parts = [...word.prefixes, ...word.roots, ...word.suffixes];
    });

    this.parts = parts;
    this.words = words;
    this.prefixes = parts.filter(byType("prefix"));
    this.roots = parts.filter(byType("root"));
    this.suffixes = parts.filter(byType("suffix"));

    this.index = [...parts, ...words].reduce((index, word) => {
        if(additionalProps[word.key]) {
            // add any additional props to the word
            _.extend(word, additionalProps[word.key]);
        }
        index[word.key] = word;
        return index;
    }, {});

    _.bindAll(this);
}

_.extend(Dictionary.prototype, {
    get(key) {
        const word = this.index[key];
        if(!word) {
            console.error("Can't find word with key: " + key);
            return null;
        }
        return word;
    },

    getWordsWithPart(partId) {
        return _(this.words)
            .filter((word) => {
                return word.parts.indexOf(partId) !== -1
            })
            .map((word) => word.key)
            .value();
    },

    filterByPartCount(count) {
        return this.words.filter((word) => {
            return word.parts.length === count;
        });
    }
});

module.exports = Dictionary;
