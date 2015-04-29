

// Takes a value and returns a function that when called returns the passed value
function constant(v) {
    return function() {
        return v;
    };
}

module.exports = constant;