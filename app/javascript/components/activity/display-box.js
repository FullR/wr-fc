const React = require("react");
const _ = require("lodash");
const colors = require("colors");

const DisplayBox = React.createClass({
    mixins: [require("mixins/style")],

    render() {
        const disabled = this.props.disabled || !this.props.onClick;
        const style = {
            background: colors.DISPLAY_BOX_BG,
            cursor: disabled ? "default" : "pointer",
            marginTop: 16,
            padding: 8,
            textAlign: "center",
            modifiers: [
                {highlighted: {
                    background: colors.DISPLAY_BOX_BG_HOVER
                }}
            ],
            states: [
                {hover: disabled ? {} : {
                    background: colors.DISPLAY_BOX_BG_HOVER
                }}
            ]
        };

        return (
            <div {...this.props} {...this.getStyle(style)}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = DisplayBox;
