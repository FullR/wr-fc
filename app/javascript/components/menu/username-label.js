var React = require("react");
var _ = require("lodash");
var bp = require("utility/bp");
var {small, medium} = require("sizes");

var UsernameLabel = React.createClass({
    render: function() {
        var style = {
            position: "absolute",
            textDecoration: "none",
            color: "#000000"
        };

        _.extend(style, bp({
            [medium]: {
                top: 20,
                right: 20,
                fontSize: 15
            },

            defaults: {
                top: 32,
                right: 32,
                fontSize: 20
            }
        }));
        return (
            <div style={style}>{this.props.children}</div>
        );
    }
});

module.exports = UsernameLabel;
