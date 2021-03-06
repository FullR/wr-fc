const React = require("react");
const colors = require("colors");
const bp = require("utility/bp");
const {small, medium} = require("sizes");

const ChangeUserButton = React.createClass({
    mixins: [require("mixins/style")],

    render() {
        const style = {
            position: "absolute",
            left: bp({
                [small]: 10,
                [medium]: 20,
                defaults: 32
            }),
            bottom: bp({
                [small]: 10,
                [medium]: 20,
                defaults: 32
            }),
            fontSize: bp({
                [medium]: 20,
                defaults: 30
            }),
            padding: bp({
                [small]: 4,
                [medium]: 6,
                defaults: 8
            }),
            zIndex: 2,
            background: colors.INFO_BUTTON_BG,
            border: "2px solid black",
            borderRadius: 5,
            color: "#FFFFFF",
            textAlign: "center",
            textShadow: "2px 2px 2px rgba(150, 150, 150, 0.44)",
            cursor: "pointer",

            states: [
                {hover: {
                    background: colors.INFO_BUTTON_BG_HOVER
                }}
            ]
        };

        return (
            <div {...this.props} {...this.getStyle(style)}>
                Change<br/>User
            </div>
        );
    }
});

module.exports = ChangeUserButton;
