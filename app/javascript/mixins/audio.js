const Sound = require("sound/sound");
const _ = require("lodash");

const soundCache = new Map();

function isSoundCached(path) {
  return soundCache.has(path);
}

function getSound(path) {
  if(!isSoundCached(path)) {
    soundCache.set(path, new Sound({path}));
  }
  return soundCache.get(path);
}

module.exports = {
  play(path, delay) {
    return getSound(path).play(delay);
  },

  release(...paths) {
    return Promise.all(
      _(paths)
        .filter(isSoundCached)
        .map(getSound)
        .invoke("release")
        .valueOf()
    );
  },

  isPlaying(path) {
    return isSoundCached(path) && getSound(path).isPlaying();
  },

  stop(...paths) {
    return Promise.all(
      _(paths)
        .filter(isSoundCached)
        .invoke("stop")
        .valueOf()
    );
  }
};
