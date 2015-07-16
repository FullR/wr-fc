const {without} = require("util");

module.exports = {
    setTimeout(callback, ms, context, ...args) {
        const timeouts = (this.timeouts || this.timeouts = []);
        const timeoutId = setTimeout(() => {
            this.timeouts = without(this.timeouts, timeoutId);
            callback.apply(context, ...args);
        }, ms);

        timeouts.push(timeoutId);
    },
};
