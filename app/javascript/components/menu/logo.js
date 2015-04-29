var React = require("react");
var _ = require("lodash");
var WebLink = require("components/utility/web-link");
var bp = require("utility/bp");
var {small, medium} = require("sizes");

var Logo = React.createClass({
    render: function() {
        var height = 132;
        var width = 205;

        var style = _.extend({
            display: "block",
            width: bp({
                [medium]: width * 0.75,
                defaults: width
            }),

            height: bp({
                [medium]: height * 0.75,
                defaults: height
            }),
            zIndex: 10
        }, this.props.style);


        var imageStyle = {
            display: "block",
            width: "100%",
            height: "100%"
        };

        return (
            <WebLink style={style} href="http://criticalthinking.com/">
                <img src="assets/images/tctc-logo.png" style={imageStyle}/>
            </WebLink>
        );
    }
});

module.exports = Logo;