/*
    Takes a key and a value and returns a function 
    that takes an object and assigns the value to it 
    at the specified key. Returns the passed object

    Example:
        var fooSetter = assign("foo", "bar");
        var a = {};

        fooSetter(a);

        a.foo === "bar";

*/
function assign(key, value) {
    return function(obj) {
        obj[key] = value;
        return obj;
    };
}

module.exports = assign;
