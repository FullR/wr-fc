var React = require("react");
var bp = require("utility/bp");
var {small, medium} = require("sizes");

var ButtonContainer = React.createClass({
    render: function() {
        var style = {
            position: "absolute",
            top: bp({
                [small]: 45,
                [medium]: 65,
                defaults: 80
            }),
            bottom: bp({
                [small]: 80,
                [medium]: 120,
                defaults: 160
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
