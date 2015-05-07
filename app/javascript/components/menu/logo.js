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
                [small]: width * 0.65,
                [medium]: width * 0.85,
                defaults: width
            }),

            height: bp({
                [small]: height * 0.65,
                [medium]: height * 0.85,
                defaults: height
            }),
            zIndex: 5
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