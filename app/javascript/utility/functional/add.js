// Curried add function
// add(1, 2) === add(1)(2)
function add(a, b) {
    return arguments.length >= 2 ? a + b : function(b) {
        return a + b;
    };
}

module.exports = add;
