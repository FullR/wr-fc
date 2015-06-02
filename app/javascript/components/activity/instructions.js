const React = require("react");
const bp = require("utility/bp");
const {small, medium} = require("sizes");

const Instructions = React.createClass({
    render() {
        const style = {
            fontSize: bp({
                [medium]: 25,
                defaults: 35
            }),
            textAlign: "center",
            transition: this.props.fade ? "opacity 0.25s" : null,
            opacity: this.props.fade ? 0 : 1
        };

        return (
            <div {...this.props} style={style}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = Instructions;
