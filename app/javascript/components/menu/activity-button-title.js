var React = require("react");
var bp = require("utility/bp");
var colors = require("colors");
var {micro, small, medium} = require("sizes");

var ActivityButtonTitle = React.createClass({
    render: function() {
        var style = {
            top: bp({
                [medium]: 3,
                defaults: 5
            }),
            left: bp({
                [small]: 25,
                [medium]: 35,
                defaults: 45
            }),
            fontSize: bp({
                [micro]: 12,
                [small]: 16,
                [medium]: 20,
                defaults: 24
            }),
            textAlign: "left",
            position: "absolute",
            fontWeight: "bold",
            right: 10,
            color: "#000000"
        };

        return (
            <div style={style}>{this.props.children}</div>
        );
    }
});

module.exports = ActivityButtonTitle;
