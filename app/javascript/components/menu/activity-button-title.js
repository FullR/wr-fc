var React = require("react");
var bp = require("utility/bp");
var colors = require("colors");
var {small, medium} = require("sizes");

var ActivityButtonTitle = React.createClass({
    render: function() {
        var style = {
            textAlign: "left",
            position: "absolute",
            top: "0.5rem",
            fontWeight: "bold",
            left: bp({
                [medium]: "2.5rem",
                defaults: "4.5rem"
            }),
            fontSize: bp({
                [medium]: "1.5rem",
                defaults: "2rem"
            }),
            width: "80%",
            color: "#000000"
        };

        return (
            <div style={style}>{this.props.children}</div>
        );
    }
});

module.exports = ActivityButtonTitle;