var React = require("react");

var ProductTitle = React.createClass({
    render: function() {
        var style = {
            fontSize: 22,
            fontWeight: 700,
            textDecoration: "italic"
        };
        return (
            <span><span style={style}>{this.props.children}</span>&trade;</span>
        );
    }
});

module.exports = ProductTitle;
