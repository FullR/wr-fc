const React = require("react");
const bp = require("utility/bp");
const {small, medium} = require("sizes");

const ChoiceContainer = React.createClass({
    render() {
        const width = bp({
            [small]: (125 * 5) + 50,
            [medium]: (175 * 5) + 50,
            "width < 1245": (175 * 5) + 50,
            defaults: (250 * 5) + 50
        });
        const style = {
            display: "inline-block",
            height: "100%",
            width: width,
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

module.exports = ChoiceContainer;
