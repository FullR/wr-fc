const Q = require("q");

module.exports = function queue(arr, fn) {
    let running = true;

    const promise = arr.reduce((q, ...args) => {
        return q.then(function queueStep() {
            if(running) {
                return fn(...args);
            }
        });
    }, Q.resolve());

    return {
        promise: promise,
        stop: function stopQueue() {
            running = false;
        }
    };
};
