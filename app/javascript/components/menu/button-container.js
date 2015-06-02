const React = require("react");
const bp = require("utility/bp");
const {small, medium} = require("sizes");

const ButtonContainer = React.createClass({
    render() {
        const style = {
            position: "absolute",
            top: bp({
                [small]: 45,
                [medium]: 65,
                defaults: 80
            }),
            bottom: bp({
                [small]: 80,
                [medium]: 120,
                defaults: 160
            }),
            width: "100%",
            textAlign: "center"
        };

        return (
            <div style={style}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = ButtonContainer;
