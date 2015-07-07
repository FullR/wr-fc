const React = require("react");
const {Link} = require("react-router");
const colors = require("colors");
const bp = require("utility/bp");
const {micro, small, medium} = require("sizes");

const InfoBackButton = React.createClass({
    mixins: [require("mixins/style")],

    render() {
        const style = {
            position: "absolute",
            bottom: bp({
                [medium]: 6,
                defaults: 8
            }),
            right: bp({
                [medium]: 9,
                defaults: 12
            }),
            padding: bp({
                [small]: "12px 20px 12px 20px",
                [medium]: "16px 24px 16px 24px",
                defaults: "20px 30px 20px 30px"
            }),
            fontSize: bp({
                [micro]: 14,
                [small]: 16,
                [medium]: 18,
                defaults: 20
            }),
            color: "#FFFFFF",
            border: "2px solid #000000",
            background: colors.INFO_BUTTON_BG,
            cursor: "pointer",
            textDecoration: "none",
            fontWeight: 700,
            borderRadius: 5,

            states: [
                {hover: {
                    background: colors.INFO_BUTTON_BG_HOVER
                }}
            ]
        };

        return (
            <Link {...this.getStyle(style)} to="menu">Back</Link>
        );
    }
});

module.exports = InfoBackButton;
