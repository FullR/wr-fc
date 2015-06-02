const React = require("react");
const bp = require("utility/bp");
const {small, medium} = require("sizes");

const ScoreLabel = React.createClass({
    render() {
        const style = {
            bottom: bp({
                [small]: 3,
                [medium]: 5,
                defaults: 8
            }),
            fontSize: bp({
                [small]: 12,
                [medium]: 15,
                defaults: 22.5
            }),
            position: "absolute",
            width: "100%",
            textAlign: "center",
            textShadow: "2px 2px 2px rgba(150,150,150,0.44)",
            color: "#FFFFFF"
        };
        return (
            <div style={style}>{this.props.children}</div>
        );
    }
});

module.exports = ScoreLabel;
