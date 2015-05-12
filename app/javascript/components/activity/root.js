var React = require("react");
var _ = require("lodash");
var colors = require("colors");

var Root = React.createClass({
    render: function() {
        var style = {
            color: colors.ROOT
        };
        return (
            <span {...this.props} style={_.extend(style, this.props.style)}>{this.props.children}</span>
        );
    }
});

module.exports = Root;
