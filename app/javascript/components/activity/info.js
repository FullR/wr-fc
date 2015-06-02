const React = require("react");

const style = {
    position: "absolute",
    top: 8,
    right: 8,
    fontSize: 18,
    cursor: "default"
};

const Info = React.createClass({
    render() {
        return (
            <div style={style}>{this.props.children}</div>
        );
    }
});

module.exports = Info;
