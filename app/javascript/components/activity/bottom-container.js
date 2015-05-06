var React = require("react");

var BottomContainer = React.createClass({
    render: function() {
        var style = {
            position: "absolute",
            bottom: "15%",
            width: "100%",
            height: 150,
            textAlign: "center",
            verticalAlign: "middle"
        };

        return (
            <div style={style}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = BottomContainer;