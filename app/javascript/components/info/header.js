const React = require("react");
const colors = require("colors");
const getVars = require("./variables");
const bp = require("utility/bp");
const {micro, small, medium} = require("sizes");

const InfoHeader = React.createClass({
    render() {
        const vars = getVars();
        const style = {
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
