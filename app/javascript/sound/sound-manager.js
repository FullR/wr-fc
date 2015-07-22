const Q     = require("q");
const _     = require("lodash");
const Sound = require("./sound");

const sounds = [];
const soundIndex = {};

let toRelease = [];

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

function play(path, delay, autoRelease) {
    const sound = get(path);

    return sound.play(delay).then(() => {
        if(autoRelease) {
            release(sound);
        }
    });
}

function stop() {
    return sounds.map(function(sound) {
        return sound.stop();
    });
}

function release(sound) {
    if(!sound) {
        console.warn("Falsey value passed to soundManager.release. No-op");
        return;
    }
    sound.stop();
    //console.log("Releasing " + sound.path);
    toRelease.push(sound);
    if(toRelease.length >= 20) {
        //console.log("Releasing old audio");
        _.invoke(toRelease, "release");
        toRelease = [];
    }
}

function logInfo() {
    const loaded = sounds.filter((sound) => sound.isLoaded());
    console.log(`
        Sound Info
            sounds.length = ${sounds.length}
            loaded.length = ${loaded.length}
            toRelease.length = ${toRelease.length}
    `);
}

/*setInterval(() => {
    if(toRelease.length) {
        const sound = toRelease.shift();
        sound.stop();
        sound.release();
        logInfo();
    }
}, 3000);
*/
const soundManager = {get, release, play, stop};

module.exports = soundManager;
