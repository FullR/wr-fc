const React = require("react");
const color = require("./level-color");
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
            background: color
        };

        return (
            <div style={style}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = InfoHeader;
