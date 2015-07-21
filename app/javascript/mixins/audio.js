const soundManager = require("sound/sound-manager");
const _ = require("lodash");

const PLAYING = new Set();

module.exports = {
  play(path, delay, releaseAfter) {
    PLAYING.add(path);
    this.setState(this.state);
    return soundManager.play(path, delay, releaseAfter).then(() => {
      PLAYING.delete(path);
      this.setState(this.state);
    });
  },

  load(...paths) {
    return Promise.all(_(paths).map(soundManager.get).invoke("load").valueOf());
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
