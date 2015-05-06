module.exports = function mountedOnly(fn) {
    return function() {
        if(this.isMounted()) {
            fn.apply(this, arguments);
        }
    };
};