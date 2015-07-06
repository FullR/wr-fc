const Q = require("q");

module.exports = function queue(arr, fn) {
    let running = true;

    const promise = arr.reduce((q, ...args) => {
        return q.then(() => running ? fn(...args) : null);
    }, Q.resolve());

    return {
        promise,
        stop() {
            running = false;
        }
    };
};
