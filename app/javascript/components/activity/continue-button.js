var React = require("react");
var {StyleResolverMixin, BrowserStateMixin} = require("radium");
var bp = require("utility/bp");
var {small, medium} = require("sizes");

var ContinueButton = React.createClass({
    mixins: [StyleResolverMixin, BrowserStateMixin],

    render: function() {
        var style = this.buildStyles({
            position: "absolute",
            right: bp({
                [medium]: "3rem",
                defaults: "10rem"
            }),
            bottom: "15%",
            width: "7.5rem",
            height: "15rem",
            backgroundSize: "100% 100%",
            backgroundImage: "url('assets/images/continue-button.png')",
            cursor: "pointer",

            states: [
                {hover: {
                    backgroundImage: "url('assets/images/continue-button_hover.png')"
                }}
            ]
        });

        return (
            <div {...this.props} {...this.getBrowserStateEvents()} style={style}></div>
        );
    }
});

module.exports = ContinueButton;