const React = require("react");
const _ = require("lodash");
const fastclick = require("fastclick");
const Router = require("react-router");
const ready = require("polyfills/cordova/device-ready");

const images = [
    "continue-button",
    "continue-button_hover",
    "end-game",
    "home-button",
    "home-button_hover",
    "stars",
    "tctc-logo",
    "x",
    "other-products/left",
    "other-products/lssg",
    "other-products/right",
    "other-products/asg",
    "other-products/vssg",
    "other-products/rtr",
    "other-products/rr",
    "splash"
];

module.exports = function setup(globals) {
    console.log("deviceready fired");
    console.log("---- STARTING APPLICATION ----");
    require("babelify/polyfill");
    require("polyfills/function-prototype-bind");

    _.extend(window, globals);
    React.initializeTouchEvents(true);
    document.getElementsByTagName("title")[0].innerHTML = `Word Roots ${window.level.title} Flashcards`;
    const appStore = require("app-store");
    let router;
    if(!window.__platform.cordova) {
        document.body.classList.add("hover-enabled");
    }
    fastclick(document.body);

    images.forEach((filename) => {
        document.createElement("img").src = `assets/images/${filename}.png`;
    });


    if(window.plugin && window.plugin.statusbarOverlay) {
        window.plugin.statusbarOverlay.hide();
    }
    if(window.navigator && window.navigator.splashscreen) {
        window.navigator.splashscreen.hide();
    }
    // Cordova media polyfill
    require("polyfills/cordova/cordova-media-plugin")();
    router = Router.create(require("routes"));

    router.run(function(Handler, state) {
        React.withContext({
            router: router
        }, function() {
            React.render(<Handler {...state}/>, document.body);
        });
    });
};
