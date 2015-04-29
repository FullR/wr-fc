var React = require("react");
var _ = require("lodash");
var bp = require("utility/bp");
var {small, medium} = require("sizes");

var UsernameLabel = React.createClass({
    render: function() {
        var style = {
            position: "absolute"
        };

        _.extend(style, bp({
            [medium]: {
                top: "2rem",
                right: "2rem",
                fontSize: "1.5rem"
            },

            defaults: {
                top: "3.2rem",
                right: "3.2rem",
                fontSize: "2rem"
            }
        }));
        return (
            <div style={style}>{this.props.children}</div>
        );
    }
});

module.exports = UsernameLabel;