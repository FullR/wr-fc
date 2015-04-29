var React = require("react");

var style = {
    position: "absolute",
    left: "50%",
    top: "6.4rem",
    width: "60rem",
    marginLeft: "-30rem",
    cursor: "default"
};

var InstructionsBox = React.createClass({
    render: function() {
        return (
            <div {...this.props} style={style}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = InstructionsBox;