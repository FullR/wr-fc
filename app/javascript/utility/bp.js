const _ = require("lodash");

const compareRegex = /(width|height)\s*(<|>|=|<=|>=)\s*(\d*)/;
const unsubscribe = Symbol("bp mixin unsubscribe");
let [width, height] = getDimension();
let evalCache = new Map();

const compareOps = {
    "<": op((a, b) => a < b),
    ">": op((a, b) => a > b),
    "<=": op((a, b) => a <= b),
    ">=": op((a, b) => a >= b),
    "=": op((a, b) => a === b)
};

function getDimension() {
    const docEl = document.documentElement;
    const body = document.getElementsByTagName('body')[0];
    const width = window.innerWidth || docEl.clientWidth || body.clientWidth;
    const height = window.innerHeight || docEl.clientHeight || body.clientHeight;

    return [width, height];
}

function getDimValue(dimName) {
    if(dimName === "width") {
        return width;
    } else if(dimName === "height") {
        return height;
    } else {
        throw new Error("Invalid dimension name: " + dimName);
    }
}

function op(compareFn) {
    return (dimName, compareValue) => {
        compareValue = parseInt(compareValue);
        if(compareValue !== compareValue) {
            throw new Error("Compare value isn't a number");
        }
        return compareFn(getDimValue(dimName), compareValue);
    };
}

function evalOp(bpString) {
    if(evalCache.has(bpString)) {
        return evalCache.get(bpString);
    } else {
        const [, dimName, op, compareValue] = bpString.match(compareRegex);
        const passes = compareOps[op] && compareOps[op](dimName, compareValue);
        evalCache.set(bpString, passes);
        return passes;
    }
}

function bp(bpMap) {
    const pairs = _.pairs(bpMap);
    let defaultResult;

    for(let [bpString, resultValue] of pairs) {
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

bp.mixin = {
    componentDidMount() {
        const onResize = (() => this.forceUpdate());
        window.addEventListener("resize", onResize);
        this[unsubscribe] = (() => window.removeEventListener("resize", onResize));
    },

    componentWillUnmount() {
        if(this[unsubscribe]) {
            this[unsubscribe]();
            this[unsubscribe] = null;
        }
    }
};

window.addEventListener("resize", () => {
    evalCache = new Map();
    [width, height] = getDimension();
});

bp.getHeight = () => height;
bp.getWidth = () => width;

module.exports = bp;
