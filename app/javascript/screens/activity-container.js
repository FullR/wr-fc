const React = require("react");
const MenuButton = require("components/activity/menu-button");

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
    render() {
        return (
            <div style={style}>
                {this.props.children}
                <MenuButton/>
            </div>
        );
    }
});

module.exports = ActivityContainer;
