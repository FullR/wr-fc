const React = require("react");
const _ = require("lodash");
const colors = require("colors");

const Prefix = React.createClass({
    render() {
        const style = {
            color: colors.PREFIX
        };

        return (
            <span {...this.props} style={_.extend(style, this.props.style)}>{this.props.children}</span>
        );
    }
});

module.exports = Prefix;
