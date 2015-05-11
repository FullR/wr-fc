var React = require("react");
var {StyleResolverMixin, BrowserStateMixin} = require("radium");
var bp = require("utility/bp");
var {micro, small, medium} = require("sizes");

var ContinueButton = React.createClass({
    mixins: [StyleResolverMixin, BrowserStateMixin],

    render: function() {
        var style = this.buildStyles({
            position: "absolute",
            width: bp({
                [small]: 45,
                [medium]: 60,
                defaults: 75
            }),
            height: 150,
            backgroundSize: "100% 100%",
            backgroundImage: "url('assets/images/continue-button.png')",
            cursor: "pointer",
            textAlign: "right",
            bottom: "15%",
            marginBottom: -20,
            right: "2.5%",
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