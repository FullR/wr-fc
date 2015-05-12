var React = require("react");
var _ = require("lodash");
var {Link} = require("react-router");
var appStore = require("app-store");
var Logo = require("components/menu/logo");

var Splash = React.createClass({
    render: function() {
        var style = {
            position: "absolute",
            cursor: "pointer",
            width: "100%",
            height: "100%",
            backgroundImage: "url('assets/images/splash.png')",
            backgroundSize: "100% 100%"
        };

        var logoStyle = {
            position: "absolute",
            left: 45,
            top: 45
        };

        return (
            <div>
                <Logo style={logoStyle}/>
                <Link style={style} to={appStore.getUsername().length ? "menu" : "login"}/>
            </div>
        );
    }
});

module.exports = Splash;
