var _ = require("lodash");

// edge cases flags go here
var additionalProps = {
    "word-per capita": { // only word with a space in it
        space: true
    }
};

function Dictionary(props) {
    var byType = (type) => ((part) => part.type === type);
    var parts = props.parts;
    var words = props.words;

    this.parts = parts;
    this.words = words;
    this.prefixes = parts.filter(byType("prefix"));
    this.roots = parts.filter(byType("root"));
    this.suffixes = parts.filter(byType("suffix"));

    this.index = parts.concat(words).reduce((index, word) => {
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
    get: function(key) {
        var word = this.index[key];
        if(!word) {
            console.error("Can't find word with key: " + key);
            return null;
        }
        return word;
    },

    getWordsWithPart: function(partId) {
        return _(this.words)
        .filter((word) => {
            return [...word.prefixes, ...word.roots, ...word.suffixes].indexOf(partId) !== -1
        })
        .map((word) => word.key)
        .value();
    },

    filterByPartCount: function(count) {
        return this.words.filter((word) => {
            return [...word.prefixes, ...word.roots, ...word.suffixes].length === count;
        });
    }
});

module.exports = Dictionary;
