var React = require("react");
var bp = require("utility/bp");
var {small, medium} = require("sizes");

var Instructions = React.createClass({
    render: function() {
        var style = {
            fontSize: bp({
                [medium]: "2.5rem",
                defaults: "3.5rem"
            }),
            textAlign: "center",
            transition: this.props.fade ? "opacity 0.25s" : null,
            opacity: this.props.fade ? 0 : 1
        };

        return (
            <div {...this.props} style={style}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = Instructions;