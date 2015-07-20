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
    else if(soundIndex[path]) { return soundIndex[path]; }

    sound = new Sound(_.extend({path}, options));

    sounds.push(sound);
    soundIndex[path] = sound;

    return sound;
}

function play(path, delay, releaseAfter) {
    const sound = get(path);
    return sound.play(delay)
        .then(() => {
            if(releaseAfter) {
                setTimeout(() => {
                    release(sound);
                }, releaseAfter);
            }
        });
}

function stop() {
    return Q.all(sounds.map(function(sound) {
        return sound.stop();
    }));
}

function release(sound) {
    //logInfo();
    sound.stop();
    sound.release();
}

function logInfo() {
    console.log(`
        Sound Info
            sounds.length = ${sounds.length}
            loaded.length = ${sounds.filter((sound) => sound.isLoaded()).length}
    `);
}

const soundManager = {get, release, play, stop};

module.exports = soundManager;
