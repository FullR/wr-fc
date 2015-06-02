/*
    Set a deeply nested property in an object.
    If an intermediate property doesn"t exist,
    it will be assigned a blank object.

    Example:
        var a = {foo: {bar: {fizz: "buzz"}}};
        deepSet(a, "foo.bar.fizz", "foobar");
        a.foo.bar.fizz === "foobar";
*/
function deepSet(obj, keys, value) {
    let i;
    if(typeof keys === "string") {
        keys = keys.split(".");
    }
    for(i = 0, length = keys.length - 1; i < length; i++) {
        obj = obj[keys[i]] || (obj[keys[i]] = {});
    }
    obj[keys[i]] = value;
    return obj;
}

module.exports = deepSet;
