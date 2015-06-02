const React = require("react");
const RouteHandler = require("react-router").RouteHandler;

const Application = React.createClass({
    mixins: [require("utility/bp").mixin],

    render() {
        return (
            <div style={{width: "100%", height: "100%"}}>
                <RouteHandler {...this.props}/>
            </div>
        );
    }
});

module.exports = Application;
