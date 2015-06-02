const React = require("react");
const _ = require("lodash");
const bp = require("utility/bp");
const {micro, small, medium} = require("sizes");

const ButtonGroupHeader = React.createClass({
    render() {
        const baseStyles = {
            textAlign: "center",
            width: "100%",
            height: "5%",
            fontSize: bp({
                [micro]: 12,
                [small]: 15,
                [medium]: 20,
                defaults: 25
            }),
            fontWeight: "bold"
        };
        const styles = this.props.styles ? _.extend(baseStyles, this.props.styles) : baseStyles;

        return (
            <div style={styles}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = ButtonGroupHeader;
