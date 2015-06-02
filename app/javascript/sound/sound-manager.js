const Q     = require("q");
const _     = require("lodash");
const Sound = require("./sound");

const sounds = [];
const soundIndex = {};

function get(path) {
    let sound;
    path = `assets/audio/${path}`;

    if(soundIndex[path]) { return soundIndex[path]; }

    sound = new Sound({path});

    sounds.push(sound);
    soundIndex[path] = sound;

    return sound;
}

function release(sound) {
    sound.stop();
}

const soundManager = {
    get: get,
    release: release,
    stop() {
        return Q.all(sounds.map(function(sound) {
            return sound.stop();
        }));
    }
};

module.exports = soundManager;
