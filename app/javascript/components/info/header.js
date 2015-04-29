var React = require("react");
var colors = require("colors");
var getVars = require("./variables");

var InfoHeader = React.createClass({
    render: function() {
        var vars = getVars();
        var style = {
            height: vars.HEADER_HEIGHT,
            width: "100%",
            fontSize: 48,
            lineHeight: vars.HEADER_HEIGHT,
            textAlign: "center",
            background: colors.INFO_FRAME_BG
        };

        return (
            <div style={style}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = InfoHeader;