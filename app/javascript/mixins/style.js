const _ = require("lodash");
const {StyleResolverMixin, BrowserStateMixin} = require("radium");

module.exports = {
    mixins: [StyleResolverMixin, BrowserStateMixin],
    getListeners() {
        const eventListeners = this.getBrowserStateEvents();
        eventListeners.onTouchStart = eventListeners.onMouseEnter;
        eventListeners.onTouchCancel = eventListeners.onTouchEnd = eventListeners.onMouseLeave;
        return eventListeners;
    },

    getStyle(style) {
        return _.extend({
            style: this.buildStyles(style)
        }, this.getListeners());
    }
};