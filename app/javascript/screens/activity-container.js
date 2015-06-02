const React = require("react");
const MenuButton = require("components/activity/menu-button");
const {RouteHandler} = require("react-router");

const style = {
    width: "100%",
    height: "100%"
};

const menuButtonStyle = {
    position: "absolute",
    bottom: 30,
    left: 30
};

const ActivityContainer = React.createClass({
    contextTypes: {
        router: React.PropTypes.func,
        level: React.PropTypes.object,
        dictionary: React.PropTypes.object
    },

    render() {
        return (
            <div style={style}>
                <RouteHandler {...this.props}/>
                <MenuButton/>
            </div>
        );
    }
});

module.exports = ActivityContainer;
