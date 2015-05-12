var React = require("react");
var _ = require("lodash");
var WebLink = require("components/utility/web-link");
var bp = require("utility/bp");
var {small, medium} = require("sizes");

var Logo = React.createClass({
    render: function() {
        var ratio = bp({
            [small]: 0.65,
            [medium]: 0.85,
            defaults: 1
        });

        var style = _.extend({
            display: "block",
            width: 205 * ratio,
            height: 132 * ratio,
            zIndex: 2
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
