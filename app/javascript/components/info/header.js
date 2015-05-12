var React = require("react");
var colors = require("colors");
var getVars = require("./variables");
var bp = require("utility/bp");
var {micro, small, medium} = require("sizes");

var InfoHeader = React.createClass({
    render: function() {
        var vars = getVars();
        var style = {
            height: vars.HEADER_HEIGHT,
            width: "100%",
            fontSize: bp({
                [micro]: 26,
                [small]: 32,
                [medium]: 40,
                defaults: 48
            }),
            lineHeight: vars.HEADER_HEIGHT + "px",
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
