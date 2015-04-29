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
                [small]: "0.4rem 1rem",
                [medium]: "0.8rem 1.5rem",
                defaults: "1.2rem 2rem"
            }),
            fontSize: bp({
                [small]: "1.2rem",
                [medium]: "1.8rem",
                defaults: "2.4rem"
            }),
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