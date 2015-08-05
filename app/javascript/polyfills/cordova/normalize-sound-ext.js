let audioExtention;

function isSupported(ext) {
    return Modernizr.audio[ext] && Modernizr.audio[ext] !== "";
}

function path(filepath) {
    if(window.__platform.name === "android") {
        return `/android_asset/www/${filepath}`;
    }
    else if(window.__platform.name === "ios") {
        return `${filepath}`;
    }
    else {
        return filepath;
    }
}

switch(window.__platform.name) {
    case "web":
        if(isSupported("ogg")) {
            audioExtention = "ogg";
        } else if(isSupported("mp3")) {
            audioExtention = "mp3";
        }
    break;
    case "android": audioExtention = "ogg"; break;
    case "ios":     audioExtention = "mp3"; break;
}

console.log("Using audio format: ", audioExtention);

module.exports = {path, audioExtention};
