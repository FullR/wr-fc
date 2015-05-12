var React = require("react");

var style = {
    position: "absolute",
    top: 8,
    right: 8,
    fontSize: 18,
    cursor: "default"
};

var Info = React.createClass({
    render: function() {
        return (
            <div style={style}>{this.props.children}</div>
        );
    }
});

module.exports = Info;
