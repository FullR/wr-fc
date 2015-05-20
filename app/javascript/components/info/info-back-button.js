var React = require("react");
var {Link} = require("react-router");
var colors = require("colors");
var bp = require("utility/bp");
var {micro, small, medium} = require("sizes");

var InfoBackButton = React.createClass({
    mixins: [require("mixins/style")],

    render: function() {
        var style = {
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
            border: "1px solid #000000",
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
