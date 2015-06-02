// From: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5
            // internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        const aArgs = Array.prototype.slice.call(arguments, 1), 
          fToBind = this, 
          FNop = function () {},
          FBound = function () {
            return fToBind.apply(this instanceof FNop && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
          };

        FNop.prototype = this.prototype;
        FBound.prototype = new FNop();

        return FBound;
    };
}
