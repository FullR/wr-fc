const React = require("react");
const _ = require("lodash");
const {Link} = require("react-router");
const appStore = require("app-store");
const Logo = require("components/menu/logo");

const style = {
    position: "absolute",
    cursor: "pointer",
    width: "100%",
    height: "100%",
    backgroundImage: "url('assets/images/splash.png')",
    backgroundSize: "100% 100%"
};

const logoStyle = {
    position: "absolute",
    left: 45,
    top: 45
};

const Splash = React.createClass({
    render() {
        return (
            <div>
                <Logo style={logoStyle}/>
                <Link style={style} to={appStore.getUsername().length ? "menu" : "login"}/>
            </div>
        );
    }
});

module.exports = Splash;
