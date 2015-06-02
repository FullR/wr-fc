const React = require("react");

const style = {
    fontSize: 22,
    fontWeight: 700,
    textDecoration: "italic"
};

const ProductTitle = React.createClass({
    render() {
        return (
            <span><span style={style}>{this.props.children}</span>&trade;</span>
        );
    }
});

module.exports = ProductTitle;
