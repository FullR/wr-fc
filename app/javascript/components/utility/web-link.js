var React = require("react");

var WebLink = React.createClass({
    openInSystem: function(event) {
        event.preventDefault();
        window.open(this.props.href, "_system", "location=yes")
    },

    render: function() {
        if(window.__platform.cordova) {
            return (
                <a {...this.props} href="#" onClick={this.openInSystem}>{this.props.children}</a>
            );
        }
        return (<a {...this.props} target="_blank">{this.props.children}</a>);
    }
});

module.exports = WebLink;
