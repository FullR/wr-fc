var React = require("react");
var WebLink = require("components/utility/web-link");

var Product = React.createClass({
    mixins: [require("mixins/style")],

    render: function() {
        var style = {
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

        var imageStyle = {
            display: "inline-block",
            height: 152,
            width: 202,
            background: "#FFFFFF"
        };

        var contentStyle = {
            position: "absolute",
            left: 202,
            right: 0,
            display: "inline-block",
            height: "100%",
            padding: 8
        };

        return (
            <WebLink {...this.getStyle(style)} href={this.props.href}>
                <img src={this.props.src} style={imageStyle}/>
                <div style={contentStyle}>
                    {this.props.children}
                </div>
            </WebLink>
        );
    }
});

module.exports = Product;
