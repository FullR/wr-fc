const React = require("react");

const WebLink = React.createClass({
    openInSystem(event) {
        event.preventDefault();
        if(window.gui) {
            window.gui.Shell.openExternal(this.props.href);
        }
        else {
            window.open(this.props.href, "_system", "location=yes")
        }
    },

    render() {
        if(window.__platform.cordova || window.platform) { // cordova or node-webkit
            return (
                <a {...this.props} href="#" onClick={this.openInSystem}>{this.props.children}</a>
            );
        }
        return (<a {...this.props} target="_blank">{this.props.children}</a>);
    }
});

module.exports = WebLink;
