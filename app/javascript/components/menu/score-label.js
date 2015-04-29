var React = require("react");
var bp = require("utility/bp");
var {small, medium} = require("sizes");

var ScoreLabel = React.createClass({
    render: function() {
        var style = {
            position: "absolute",
            bottom: 8,
            width: "100%",
            textAlign: "center",
            fontSize: bp({
                [medium]: "1.5rem",
                defaults: "2.25rem"
            }),
            textShadow: "0.2rem 0.2rem 0.2rem rgba(150,150,150,0.44)",
            color: "#FFFFFF"
        };
        return (
            <div style={style}>{this.props.children}</div>
        );
    }
});

module.exports = ScoreLabel;