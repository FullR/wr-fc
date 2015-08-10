const Q = require("q");

module.exports = Q.promise((resolve) => {
    if(window.__platform.cordova) {
        document.addEventListener("deviceready", () => {
            resolve();
        }, false);
    } else {
        window.onload = () => {
            resolve();
        };
    }
});
