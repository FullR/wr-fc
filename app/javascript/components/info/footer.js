const React = require("react");
const colors = require("colors");
const TctcInfoBox = require("components/info/tctc-info-box");
const InfoBackButton = require("components/info/info-back-button");
const getVars = require("./variables");

const InfoFooter = React.createClass({
    render() {
        const vars = getVars();
        const style = {
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

module.exports = InfoFooter;
