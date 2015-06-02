const React = require("react");
const bp = require("utility/bp");
const colors = require("colors");
const {small, medium} = require("sizes");

const CloseButton = React.createClass({
    mixins: [require("mixins/style")],
    closeProgram() {
        if(window.gui) {
            window.gui.Window.get().close();
        }
    },

    render() {
        const style = {
            position: "absolute",
            right: bp({
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
                [small]: 6,
                [medium]: 8,
                defaults: 12
            }),
            zIndex: 2,
            background: colors.INFO_BUTTON_BG,
            border: "1px solid black",
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

        if(window._isNodeWebkit) {
            return (
                <div {...this.getStyle(style)} onClick={this.closeProgram}>Close</div>
            );
        }
        return null;
    }
});

module.exports = CloseButton;