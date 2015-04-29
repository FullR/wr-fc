var React = require("react");
var MenuButton = require("components/activity/menu-button");
var {RouteHandler} = require("react-router");

var ActivityContainer = React.createClass({
    contextTypes: {
        router: React.PropTypes.func,
        level: React.PropTypes.object,
        dictionary: React.PropTypes.object
    },

    render: function() {
        var style = {
            width: "100%",
            height: "100%"
        };

        var menuButtonStyle = {
            position: "absolute",
            bottom: 30,
            left: 30
        };
        return (
            <div style={style}>
                <RouteHandler {...this.props}/>
                <MenuButton/>
            </div>
        );
    }
});

module.exports = ActivityContainer;