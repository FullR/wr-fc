const React = require("react");
const bp = require("utility/bp");
const {micro, small, medium} = require("sizes");

const InstructionsBox = React.createClass({
    render() {
        const style = {
            position: "absolute",
            left: "50%",
            top: bp({
                [small]: 32,
                [medium]: 48,
                defaults: 64
            }),
            width: 600,
            marginLeft: -300,
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
