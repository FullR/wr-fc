var React = require("react");
var _ = require("lodash");
var colors = require("colors");
var {StyleResolverMixin, BrowserStateMixin} = require("radium");
var bp = require("utility/bp");
var {small, medium} = require("sizes");

var FeedbackButton = React.createClass({
    mixins: [StyleResolverMixin, BrowserStateMixin],

    render: function() {
        var style = this.buildStyles(_.extend({
            background: colors.INFO_BUTTON_BG,
            color: "#FFFFFF",
            border: "1px solid #000000",
            borderRadius: "0.5rem",
            padding: bp({
                [small]: "4px 10px",
                [medium]: "8px 15px",
                defaults: "12px 20px"
            }),
            fontSize: 24,
            cursor: "pointer",
            states: [
                {hover: {
                    background: colors.INFO_BUTTON_BG_HOVER
                }}
            ]
        }, this.props.style));

        return (
            <button {...this.props} {...this.getBrowserStateEvents()} style={style}>
                {this.props.children}
            </button>
        );
    }
});

module.exports = FeedbackButton;