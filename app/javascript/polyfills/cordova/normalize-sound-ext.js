function path(filepath) {
    if(window.__platform.name === "android") {
        return `/android_asset/www/${filepath}`;
    }

    return filepath;
}

var audioExtention,
    normalize;

switch(window.__platform.name) {
    case "web":     audioExtention = "ogg"; break;
    case "android": audioExtention = "ogg"; break;
    case "ios":     audioExtention = "mp3"; break;
}

module.exports = {path, audioExtention};