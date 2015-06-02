const React = require("react");
const bp = require("utility/bp");
const {micro, small, medium} = require("sizes");

const FooterMenu = React.createClass({
    render() {
        const style = {
            position: "absolute",
            left: "8rem",
            right: "8rem",
            textAlign: "center",
            fontSize: bp({
                [small]: 18,
                [medium]: 22,
                defaults: 25
            }),
            bottom: bp({
                [micro]: 25,
                [small]: 35,
                [medium]: 45,
                defaults: 60
            })
        };

        return (
            <div style={style}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = FooterMenu;
