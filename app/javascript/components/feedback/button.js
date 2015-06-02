const React = require("react");
const _ = require("lodash");
const colors = require("colors");
const bp = require("utility/bp");
const {small, medium} = require("sizes");

const FeedbackButton = React.createClass({
    mixins: [require("mixins/style")],

    render() {
        const style = _.extend({
            background: colors.INFO_BUTTON_BG,
            color: "#FFFFFF",
            border: "1px solid #000000",
            borderRadius: 5,
            padding: bp({
                [small]: "4px 10px",
                [medium]: "8px 15px",
                defaults: "12px 20px"
            }),
            fontSize: 24,
            cursor: "pointer",
            states: [
                {hover: {
                    background: colors.INFO_BUTTON_BG_HOVER
                }}
            ]
        }, this.props.style);

        return (
            <button {...this.props} {...this.getStyle(style)}>
                {this.props.children}
            </button>
        );
    }
});

module.exports = FeedbackButton;
