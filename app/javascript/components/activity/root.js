const React = require("react");
const _ = require("lodash");
const colors = require("colors");

const Root = React.createClass({
    render() {
        const style = {
            color: colors.ROOT
        };

        return (
            <span {...this.props} style={_.extend(style, this.props.style)}>{this.props.children}</span>
        );
    }
});

module.exports = Root;
