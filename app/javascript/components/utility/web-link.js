var React = require("react");

var WebLink = React.createClass({
    render: function() {
        return (<a {...this.props} target={window.__platform.cordova ? "_system" : "_blank"}>{this.props.children}</a>);
    }
});

module.exports = WebLink;