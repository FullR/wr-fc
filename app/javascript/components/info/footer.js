const React = require("react");
const colors = require("colors");
const color = require("./level-color");
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
            background: color
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
