const React = require("react");
const platformName = window.__platform.name;

const WebLink = React.createClass({
    openInSystem(event) {
        event.preventDefault();
        if(platformName === "ios") {
            return; // do nothing in iOS (in Abbey's edits)
        } else if(window.nativeOpen) {
            try {
                nativeOpen(this.props.href);//window.gui.Shell.openExternal(this.props.href);
            } catch(error) {
                console.error("Failed to open external link:", error);
            }
        } else {
            window.open(this.props.href, "_system", "location=yes");
        }
    },

    render() {
        if(window.__platform.name === "ios") { // no external links in iOS
            return (<span {...this.props} href={null}/>);
        } else if(window.__platform.cordova || window._isNodeWebkit) { // cordova or node-webkit
            return (<a {...this.props} href="#" onClick={this.openInSystem}>{this.props.children}</a>);
        }
        return (<a {...this.props} target="_blank">{this.props.children}</a>);
    }
});

module.exports = WebLink;
