var React = require("react");
var _ = require("lodash");
var colors = require("colors");

var Prefix = React.createClass({
    render: function() {
        var style = {
            color: colors.PREFIX
        };
        return (
            <span {...this.props} style={_.extend(style, this.props.style)}>{this.props.children}</span>
        );
    }
});

module.exports = Prefix;
