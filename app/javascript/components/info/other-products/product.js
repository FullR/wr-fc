const React = require("react");
const WebLink = require("components/utility/web-link");

const Product = React.createClass({
    mixins: [require("mixins/style")],

    render() {
        const style = {
            display: "block",
            height: 152,
            width: "100%",
            position: "relative",
            verticalAlign: "middle",
            cursor: "pointer",
            fontSize: 20,
            color: "#000000",

            states: [
                {hover: {
                    background: "rgba(0,0,255,0.05)"
                }}
            ]
        };

        const imageWrapperStyle = {
            display: "inline-block",
            height: 152,
            width: 202,
            background: "#FFFFFF"
        };

        const imageStyle = {
            maxHeight: 152,
            maxWidth: 202,
            position: "relative",
            top: "50%",
            transform: "translateY(-50%)"
        };

        const contentStyle = {
            position: "absolute",
            left: 202,
            right: 0,
            display: "inline-block",
            height: "100%",
            padding: 8
        };

        return (
            <WebLink {...this.getStyle(style)} href={this.props.href}>
                <div style={imageWrapperStyle}>
                    <img src={this.props.src} style={imageStyle}/>
                </div>
                <div style={contentStyle}>
                    {this.props.children}
                </div>
            </WebLink>
        );
    }
});

module.exports = Product;
