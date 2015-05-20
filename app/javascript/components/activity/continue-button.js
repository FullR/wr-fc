var React = require("react");
var bp = require("utility/bp");
var {micro, small, medium} = require("sizes");

var ContinueButton = React.createClass({
    mixins: [require("mixins/style")],

    render: function() {
        var style = {
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
        };

        return (
            <div {...this.props} {...this.getStyle(style)}/>
        );
    }
});

module.exports = ContinueButton;
