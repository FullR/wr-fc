var React = require("react");
var {StyleResolverMixin, BrowserStateMixin} = require("radium");
var colors = require("colors");
var bp = require("utility/bp");
var {small, medium} = require("sizes");

var ChangeUserButton = React.createClass({
    mixins: [StyleResolverMixin, BrowserStateMixin],

    render: function() {
        var style = {
            position: "absolute",
            left: bp({
                [small]: 10,
                [medium]: 20,
                defaults: 32
            }),
            bottom: bp({
                [small]: 10,
                [medium]: 20,
                defaults: 32
            }),
            fontSize: bp({
                [medium]: 20,
                defaults: 30
            }),
            padding: bp({
                [small]: 4,
                [medium]: 6,
                defaults: 8
            }),
            zIndex: 2,
            background: colors.INFO_BUTTON_BG,
            border: "1px solid black",
            borderRadius: 5,
            color: "#FFFFFF",
            textAlign: "center",
            textShadow: "2px 2px 2px rgba(150, 150, 150, 0.44)",
            cursor: "pointer",

            states: [
                {hover: {
                    background: colors.INFO_BUTTON_BG_HOVER
                }}
            ]
        };

        return (
            <div {...this.props} {...this.getBrowserStateEvents()} style={this.buildStyles(style)}>
                Change<br/>User
            </div>
        );
    }
});

module.exports = ChangeUserButton;
