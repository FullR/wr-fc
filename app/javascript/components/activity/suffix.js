var React = require("react");
var _ = require("lodash");
var colors = require("colors");

var Suffix = React.createClass({
    render: function() {
        var style = {
            color: colors.SUFFIX
        };
        return (
            <span {...this.props} style={_.extend(style, this.props.style)}>{this.props.children}</span>
        );
    }
});

module.exports = Suffix;
