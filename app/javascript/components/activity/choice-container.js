var React = require("react");
var bp = require("utility/bp");
var {small, medium} = require("sizes");

var ChoiceContainer = React.createClass({
    render: function() {
        var style = {
            position: "absolute",
            bottom: bp({
                [medium]: "8.5rem",
                defaults: "12rem"
            }),
            height: "15rem",
            left: "11rem",
            right: "11rem",
            textAlign: "center",
            verticalAlign: "middle"
        };
        return (
            <div style={style}>{this.props.children}</div>
        );
    }
});

module.exports = ChoiceContainer;