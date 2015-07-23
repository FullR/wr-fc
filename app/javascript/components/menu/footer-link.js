const React = require("react");
const bp = require("utility/bp");
const {micro, small, medium} = require("sizes");

const FooterLink = React.createClass({
    mixins: [require("mixins/style")],

    render() {
        const style = this.buildStyles({
            margin: bp({
                [micro]: "0 5px",
                [small]: "0 8px",
                [medium]: "0 12px",
                defaults: "0 16px"
            }),
            color: "#0000FF",
            textDecoration: "underline",
            cursor: "pointer",

            states: [
                {hover: {
                    color: "#000088"
                }}
            ]
        });

        return this.props.href ?
            <a {...this.getStyle(style)} {...this.props}>{this.props.children}</a> :
            <span {...this.getStyle(style)} {...this.props}>{this.props.children}</span>;
    }
});

module.exports = FooterLink;
