var React = require("react");
var bp = require("utility/bp");
var {micro, small, medium} = require("sizes");

var InstructionsBox = React.createClass({
    render: function() {
        var style = {
            position: "absolute",
            left: "50%",
            top: bp({
                [small]: 32,
                [medium]: 48,
                defaults: 64
            }),
            width: 600,
            marginLeft: -300,
            cursor: "default"
        };
        return (
            <div {...this.props} style={style}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = InstructionsBox;