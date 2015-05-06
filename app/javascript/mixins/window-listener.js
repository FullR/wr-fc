var _ = require("lodash");

module.exports = {
    _listeners: {},

    on: function(eventName, fn) {
        var listenerGroup = this._listeners[eventName] || (this._listeners[eventName] = []);
        listenerGroup.push(fn);

        window.addEventListener(eventName, fn);
    },

    componentWillUnmount: function() {
        _.each(this._listeners, (listenerGroup, eventName) => {
            listenerGroup.forEach((listenerFn) => {
                window.removeEventListener(eventName, listenerFn);
            });
        });
    }
};