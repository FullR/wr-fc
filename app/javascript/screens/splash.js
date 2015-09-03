const React = require("react");
const _ = require("lodash");
const hasher = require("hasher");
//const {Link} = require("react-router");
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

const soundLinkStyle = {
    position: "absolute",
    left: 0,
    width: "100%",
    bottom: 3,
    fontSize: 25,
    color: "#FFF",
    zIndex: 3,
    textAlign: "center"
}

const Splash = React.createClass({
    render() {
        return (
            <div>
                <Logo style={logoStyle}/>
                <a style={style} href={appStore.getUsername().length ? "#menu" : "#login"}/>
            </div>
        );
    }
});

module.exports = Splash;
