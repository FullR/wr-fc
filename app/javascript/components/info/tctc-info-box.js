const React = require("react");
const WebLink = require("components/utility/web-link");
const colors = require("colors");
const {Link} = require("react-router");
const bp = require("utility/bp");
const {micro, small, medium} = require("sizes");

const TctcInfoBox = React.createClass({
    render() {
        const width = bp({
            [micro]: 450,
            [small]: 600,
            [medium]: 750,
            defaults: 830
        });
        const style = {
            position: "absolute",
            bottom: 4,
            width: width,
            left: "50%",
            padding: bp({
                [micro]: "2px 0 2px 0",
                [small]: "4px 0 4px 0",
                [medium]: "6px 0 6px 0",
                defaults: "8px 0 8px 0"
            }),
            marginLeft: -(width/2),
            fontSize: 20,
            background: colors.INFO_FOOTER_INFO_BG,
            border: "3px solid #000000",
            borderRadius: 3,
            textAlign: "center"
        };

        return (
            <div style={style}>
                &copy; 2015 The Critical Thinking Co.&trade; &#8226; <WebLink href="http://www.CriticalThinking.com">www.CriticalThinking.com</WebLink> &#8226; 800-458-4849
            </div>
        );
    }
});

module.exports = TctcInfoBox;
