var React = require("react"),
    RouteHandler = require("react-router").RouteHandler;

var Application = React.createClass({
    mixins: [require("utility/bp").mixin],

    render: function() {
        return (
            <div style={{width: "100%", height: "100%"}}>
                <RouteHandler {...this.props}/>
            </div>
        );
    }
});

module.exports = Application;