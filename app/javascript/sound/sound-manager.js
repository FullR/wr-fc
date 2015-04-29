var Q     = require("q");
var _     = require("lodash");
var Sound = require("./sound");

var sounds = [];
var soundIndex = {};

function get(path) {
    var sound;
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

var soundManager = {
    get: get,
    release: release,
    stop: function() {
        return Q.all(sounds.map(function(sound) {
            return sound.stop();
        }));
    }
};

module.exports = soundManager;
