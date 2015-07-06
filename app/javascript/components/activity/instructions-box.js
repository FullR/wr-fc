const React = require("react");
const bp = require("utility/bp");
const {micro, small, medium} = require("sizes");

const InstructionsBox = React.createClass({
    render() {
        const style = {
            top: bp({
                [small]: 32,
                [medium]: 48,
                defaults: 64
            }),
            position: "absolute",
            left: "50%",
            width: 700,
            marginLeft: -350,
            cursor: "default"
        };

        return (
            <div {...this.props} style={style}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = InstructionsBox;
