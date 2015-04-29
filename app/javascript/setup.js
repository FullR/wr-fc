var React = require("react");
var _ = require("lodash");
var fastclick = require("fastclick");
var Router = require("react-router");
var ready = require("polyfills/cordova/device-ready");

module.exports = function setup(globals) {
    _.extend(window, globals);
    React.initializeTouchEvents(true);
    document.getElementsByTagName("title")[0].innerHTML = "Word Roots " + window.level.title + " Flashcards";

    ready.then(function() {
        var appStore = require("app-store");
        var router;
        fastclick(document.body);
        try {
            // Function.prototype.bind polyfill for cordova
            require("polyfills/function-prototype-bind")();
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
        } catch(e) {
            console.log("Caught: " + e);
            return require("q").reject(e); // Q keeps errors from being thrown within promise callbacks
        }
    }).done();
};