const _ = require("lodash");
const {StyleResolverMixin, BrowserStateMixin} = require("radium");
const {cordova} = (window.__platform || {});

module.exports = {
    mixins: [StyleResolverMixin, BrowserStateMixin],
    getListeners() {
        const eventListeners = this.getBrowserStateEvents();
        if(cordova) {
            eventListeners.onTouchStart = eventListeners.onMouseEnter;
            eventListeners.onTouchCancel = eventListeners.onTouchEnd = eventListeners.onMouseLeave;
        }
        return eventListeners;
    },

    getStyle(style) {
        return _.extend({
            style: this.buildStyles(style)
        }, this.getListeners());
    }
};
