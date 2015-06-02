const React = require("react");
const _ = require("lodash");
const bp = require("utility/bp");
const {small, medium} = require("sizes");

const UsernameLabel = React.createClass({
    render() {
        const style = {
            position: "absolute",
            textDecoration: "none",
            color: "#000000"
        };

        _.extend(style, bp({
            [medium]: {
                top: 20,
                right: 20,
                fontSize: 15
            },

            defaults: {
                top: 32,
                right: 32,
                fontSize: 20
            }
        }));
        return (
            <div style={style}>{this.props.children}</div>
        );
    }
});

module.exports = UsernameLabel;
