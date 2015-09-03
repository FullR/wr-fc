const React = require("react");
const {extend} = require("lodash");
const fastclick = require("fastclick");
const ready = require("polyfills/cordova/device-ready");
const {version} = require("../../package");

const startText = `
\n\n\n
---- STARTING APPLICATION ----
Version: ${version}`;

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
    let router;
    if(window.logger) {
        console.log("Logger detected. Switching to window.logger...");
        window.console = window.logger;
        console.log("Now using window.logger instead of window.console");
    }

    console.log(startText);

    require("babelify/polyfill");
    require("polyfills/function-prototype-bind");
    extend(window, globals);

    const Router = require("router");
    const appStore = require("app-store");
    React.initializeTouchEvents(true);

    document.getElementsByTagName("title")[0].innerHTML = `Word Roots ${window.level.title} Flashcards`;
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
    React.render(<Router/>, document.body);
};
