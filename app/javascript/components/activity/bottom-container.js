const React = require("react");
const bp = require("utility/bp");
const {micro, small, medium} = require("sizes");

const BottomContainer = React.createClass({
    render() {
        const style = {
            position: "absolute",
            bottom: bp({
                [micro]: 25,
                [small]: 50,
                [medium]: 75,
                defaults: 100
            }),
            width: "100%",
            height: bp({
                [micro]: 75,
                [small]: 100,
                [medium]: 125,
                defaults: 150
            }),
            textAlign: "center",
            verticalAlign: "middle"
        };

        return (
            <div style={style}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = BottomContainer;
