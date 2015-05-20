var _ = require("lodash");
var {StyleResolverMixin, BrowserStateMixin} = require("radium");

module.exports = {
    mixins: [StyleResolverMixin, BrowserStateMixin],
    getListeners: function() {
        var eventListeners = this.getBrowserStateEvents();
        eventListeners.onTouchStart = eventListeners.onMouseEnter;
        eventListeners.onTouchCancel = eventListeners.onTouchEnd = eventListeners.onMouseLeave;
        return eventListeners;
    },

    getStyle: function(style) {
        return _.extend({
            style: this.buildStyles(style)
        }, this.getListeners());
    }
};