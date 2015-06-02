const React = require("react");
const _ = require("lodash");
const colors = require("colors");

const Suffix = React.createClass({
    render() {
        const style = {
            color: colors.SUFFIX
        };

        return (
            <span {...this.props} style={_.extend(style, this.props.style)}>{this.props.children}</span>
        );
    }
});

module.exports = Suffix;
