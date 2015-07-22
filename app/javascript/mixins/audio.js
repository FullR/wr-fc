const soundManager = require("sound/sound-manager");
const Q = require("q");
const _ = require("lodash");

const PLAYING = new Set();

module.exports = {
  play(path, delay, autoRelease) {
    PLAYING.add(path);
    this.forceUpdate();
    return soundManager.play(path, delay, autoRelease).then(() => {
      PLAYING.delete(path);
      this.forceUpdate();
    });
  },

  load(...paths) {
    return Q.all(_(paths).map(soundManager.get).invoke("load").valueOf());
  },

  release(...paths) {
    _(paths).map(soundManager.get).invoke("stop").map(soundManager.release);
  },

  isPlaying(path) {
    return PLAYING.has(path);
  },

  stop() {
    soundManager.stop();
  },

  componentWillUnmount() {
    PLAYING.clear();
    this.stop();
  }
};
