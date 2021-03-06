module.exports = {
    // copies `array` without `toRemove`
    without(array, toRemove, predicate=(other) => other !== toRemove) {
        return array.filter(predicate);
    },

    wait(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
};