var React = require("react");
var _ = require("lodash");

var ButtonRow = React.createClass({
    render: function() {
        var styles = {
            display: "block",
            width: "100%",
            height: "19%",
            textAlign: "center",
            verticalAlign: "middle",
            margin: "0 0 2% 0"
        };

        return (
            <div style={styles}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = ButtonRow;
