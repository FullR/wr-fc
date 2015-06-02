const React = require("react");
const _ = require("lodash");
const WebLink = require("components/utility/web-link");
const bp = require("utility/bp");
const {small, medium} = require("sizes");

const Logo = React.createClass({
    render() {
        const ratio = bp({
            [small]: 0.65,
            [medium]: 0.85,
            defaults: 1
        });

        const style = _.extend({
            display: "block",
            width: 205 * ratio,
            height: 132 * ratio,
            zIndex: 2
        }, this.props.style);


        const imageStyle = {
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
