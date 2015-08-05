const audioExtention = getAudioExtention();

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

function getAudioExtention() {
    switch(window.__platform.name) {
        case "web":
            if(isSupported("ogg")) {
                return"ogg";
            } else if(isSupported("mp3")) {
                return "mp3";
            } else {
                return null;
            }
        case "android": return "ogg";
        case "ios":     return "mp3";
        default: return null;
    }
}

if(audioExtention) {
    console.log("Using audio format: ", audioExtention);
} else {
    console.log("No supported audio format detected");
}

module.exports = {path, audioExtention};
