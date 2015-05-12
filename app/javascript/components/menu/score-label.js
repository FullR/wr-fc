var React = require("react");
var bp = require("utility/bp");
var {small, medium} = require("sizes");

var ScoreLabel = React.createClass({
    render: function() {
        var style = {
            bottom: bp({
                [small]: 3,
                [medium]: 5,
                defaults: 8
            }),
            fontSize: bp({
                [small]: 12,
                [medium]: 15,
                defaults: 22.5
            }),
            position: "absolute",
            width: "100%",
            textAlign: "center",
            textShadow: "2px 2px 2px rgba(150,150,150,0.44)",
            color: "#FFFFFF"
        };
        return (
            <div style={style}>{this.props.children}</div>
        );
    }
});

module.exports = ScoreLabel;
