

/*
    Inverts the output of a function
    
    Example:
        var notFoo = negate(function(v) { return v === "foo"; });
        notFoo("foo") === false
        notFoo("bar") === true
*/
function negate(fn) {
    return function() {
        return !fn.apply(null, arguments);
    };
}

module.exports = negate;