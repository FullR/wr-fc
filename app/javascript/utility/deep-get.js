

/*
    Retrieves a deeply nested property from an object.

    Example:
        var a = {foo: {bar: {fizz: "buzz"}}};
        deepGet(a, "foo.bar.fizz") === "buzz"
*/
function deepGet(obj, keys) {
    if(typeof keys === "string") {
        keys = keys.split(".");
    }
    for(var i = 0, length = keys.length; obj && i < length; i++) {
        obj = obj[keys[i]];
    }
    return obj;
}

module.exports = deepGet;