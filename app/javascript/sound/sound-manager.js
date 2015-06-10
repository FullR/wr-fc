const Q     = require("q");
const _     = require("lodash");
const Sound = require("./sound");

const sounds = [];
const soundIndex = {};

function get(path, options={}) {
    const extention = options.extention || "";
    let sound;
    path = `assets/audio/${path}`;

    if(soundIndex[path+"."+extention]) { return soundIndex[path+"."+extention]; }

    sound = new Sound(_.extend({path}, options));

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
