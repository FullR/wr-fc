var React = require("react");
var bp = require("utility/bp");
var {small, medium} = require("sizes");

var ButtonContainer = React.createClass({
    render: function() {
        var style = {
            position: "absolute",
            top: bp({
                [medium]: "6rem",
                defaults: "8rem"
            }),
            bottom: bp({
                [medium]: "10rem",
                defaults: "16rem"
            }),
            width: "100%",
            textAlign: "center"
        };
        return (
            <div style={style}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = ButtonContainer;