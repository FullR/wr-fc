var React = require("react");
var colors = require("colors");
var TctcInfoBox = require("components/info/tctc-info-box");
var InfoBackButton = require("components/info/info-back-button");
var getVars = require("./variables");

var InfoFooter = React.createClass({
    render: function() {
        var vars = getVars();
        var style = {
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: vars.FOOTER_HEIGHT,
            background: colors.INFO_FRAME_BG
        };

        return (
            <div style={style}>
                <TctcInfoBox/>
                <InfoBackButton/>
            </div>
        );
    }
});

module.exports = InfoFooter