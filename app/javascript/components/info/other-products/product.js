var React = require("react");
var WebLink = require("components/utility/web-link");
var {StyleResolverMixin, BrowserStateMixin} = require("radium");

var Product = React.createClass({
    mixins: [StyleResolverMixin, BrowserStateMixin],

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
            <WebLink href={this.props.href} style={this.buildStyles(style)} {...this.getBrowserStateEvents()}>
                <img src={this.props.src} style={imageStyle}/>
                <div style={contentStyle}>
                    {this.props.children}
                </div>
            </WebLink>
        );
    }
});

module.exports = Product;