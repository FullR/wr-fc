

/*
    Curried dot operator

    Example:

    get("foo")({foo: "bar"}) === "bar"
*/
function get(key) {
    return function(obj) {
        return obj[key];
    };
}

module.exports = get;