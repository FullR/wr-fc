var React = require("react");

var style = {
    position: "absolute",
    left: "50%",
    top: 64,
    width: 600,
    marginLeft: -300,
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