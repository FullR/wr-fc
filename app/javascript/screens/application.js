const React = require("react");

const Application = React.createClass({
    render() {
        return (
            <div style={{width: "100%", height: "100%"}}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = Application;
