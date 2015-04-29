var React = require("react");

var style = {
    position: "absolute",
    top: "0.8rem",
    right: "0.8rem",
    fontSize: "1.8rem",
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