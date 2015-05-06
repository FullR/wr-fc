var React = require("react");
var bp = require("utility/bp");
var {small, medium} = require("sizes");

var ChoiceContainer = React.createClass({
    render: function() {
        var children = this.props.children;
        var width = bp({
            [small]: (125 * 5) + 50,
            [medium]: (175 * 5) + 50,
            "width < 1245": (175 * 5) + 50,
            defaults: (250 * 5) + 50
        });
        var style = {
            display: "inline-block",
            height: "100%",
            width: width,
            textAlign: "center",
            verticalAlign: "middle"
        };

        return (
            <div style={style}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = ChoiceContainer;