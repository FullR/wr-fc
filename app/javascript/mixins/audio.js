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
