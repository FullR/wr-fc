const Q = require("q");

let ready;

if (window.__platform.cordova) {
	console.log("Cordova detected. Waiting for 'deviceready' event");
    ready = Q.Promise(function(resolve) {
        document.addEventListener("deviceready", function() {
            resolve();
        }, false);
    });
} else {
    ready = Q.resolve();
}

module.exports = ready;
