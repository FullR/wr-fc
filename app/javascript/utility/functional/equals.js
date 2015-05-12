// Curried strict equality operator
function equals(a) {
    return function(b) {
        return a === b;
    };
}

module.exports = equals;
