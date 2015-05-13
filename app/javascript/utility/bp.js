var _ = require("lodash");
var [width, height] = getDimension();

var compareRegex = /(width|height)\s*(<|>|=|<=|>=)\s*(\d*)/;

function getDimension() {
    var docEl = document.documentElement,
        body = document.getElementsByTagName('body')[0],
        width = window.innerWidth || docEl.clientWidth || body.clientWidth,
        height = window.innerHeight || docEl.clientHeight || body.clientHeight;

    return [width, height];
}

function getDimValue(dimName) {
    if(dimName === "width") {
        return width;
    }
    else if(dimName === "height") {
        return height;
    }
    else {
        throw new Error("Invalid dimension name: " + dimName);
    }
}

function op(compareFn) {
    return function(dimName, compareValue) {
        compareValue = parseInt(compareValue);
        if(compareValue !== compareValue) {
            throw new Error("Compare value isn't a number");
        }
        return compareFn(getDimValue(dimName), compareValue);
    };
}

var compareOps = {
    "<": op(function(a, b) {
        return a < b;
    }),
    ">": op(function(a, b) {
        return a > b;
    }),
    "=": op(function() {
        return a === b;
    }),
    "<=": op(function(dimName, b) {
        return a <= b;
    }),
    ">=": op(function(dimName, b) {
        return a >= b;
    })
};

var evalCache = {};
function evalOp(bpString) {
    var dimName;
    var op;
    var compareValue;
    var passes;

    if(typeof evalCache[bpString] === "boolean") {
        return evalCache[bpString];
    }

    [, dimName, op, compareValue] = bpString.match(compareRegex);
    passes = evalCache[bpString] = (compareOps[op] && compareOps[op](dimName, compareValue));
    return passes;
}

function bp(bpMap) {
    var pairs = _.pairs(bpMap);
    var defaultResult;

    for(var [bpString, resultValue] of pairs) {
        if(bpString === "defaults") {
            defaultResult = resultValue;
            continue;
        }
        if(evalOp(bpString)) {
            return resultValue;
        }
    }

    return defaultResult;
}

window.addEventListener("resize", () => {
    evalCache = {};
    [width, height] = getDimension();
});

bp.mixin = {
    componentDidMount: function() {
        var onResize = (() => this.forceUpdate());
        window.addEventListener("resize", onResize);
        this.unsubscribe = (() => window.removeEventListener("resize", onResize));
    },

    componentWillUnmount: function() {
        if(this.unsubscribe) {
            this.unsubscribe();
            this.unsubscribe = null;
        }
    }
};

bp.getHeight = function() {
    return height;
};

bp.getWidth = function() {
    return width;
};

module.exports = bp;
