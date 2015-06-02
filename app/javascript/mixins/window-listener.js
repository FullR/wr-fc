const _ = require("lodash");

module.exports = {
    _listeners: {},

    on(eventName, fn) {
        const listenerGroup = this._listeners[eventName] || (this._listeners[eventName] = []);
        listenerGroup.push(fn);

        window.addEventListener(eventName, fn);
    },

    componentWillUnmount() {
        _.each(this._listeners, (listenerGroup, eventName) => {
            listenerGroup.forEach((listenerFn) => {
                window.removeEventListener(eventName, listenerFn);
            });
        });
    }
};
