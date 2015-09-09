const React = require("react");

const style = {
    fontSize: 22,
    fontWeight: 700,
    textDecoration: "italic"
};

const ProductTitle = React.createClass({
    render() {
        return (
            <span><span style={style}>{this.props.children}</span>{this.props.noTrademark ? "" : <span>&trade;</span>}</span>
        );
    }
});

module.exports = ProductTitle;
