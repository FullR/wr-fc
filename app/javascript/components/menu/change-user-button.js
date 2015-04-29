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
                [medium]: "2rem",
                defaults: "3.2rem"
            }),
            bottom: bp({
                [medium]: "2rem",
                defaults: "3.2rem"
            }),
            fontSize: bp({
                [medium]: "2rem",
                defaults: "3rem"
            }),
            padding: "0.8rem",
            zIndex: 2,
            background: colors.INFO_BUTTON_BG,
            border: "1px solid black",
            borderRadius: 5,
            color: "#FFFFFF",
            textAlign: "center",
            textShadow: "0.2rem 0.2rem 0.2rem rgba(150, 150, 150, 0.44)",
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