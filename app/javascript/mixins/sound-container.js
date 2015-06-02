const _ = require("lodash");
const Q = require("q");
const soundManager = require("sound/sound-manager");

module.exports = {
    _buildSounds() {
        let paths;
        let toRelease;

        if(!this.getSounds) { throw new Error("You must define a getSounds method");}
        paths = this.getSounds();

        if(this._paths) {
            toRelease = _.filter(this._paths, (path) => {
                return paths.indexOf(path) === -1;
            });

            toRelease.forEach((path) => {
                soundManager.get(path).release();
            });
        }

        this._sounds = _.transform(paths, function(result, path, id) {
            result[id] = soundManager.get(path);
        });

        this._soundLoadPromise = Q.all(_.invoke(this._sounds), "load").catch(() => Q.resolve());
    },

    componentDidMount() {
        this._buildSounds();
    },

    componentDidUpdate() {
        this._buildSounds();
    },

    componentWillUnmount() {
        if(this._sounds) {
            _.invoke(this._sounds, "release");
        }
    },

    play(id, delay) {
        return this._soundLoadPromise.then(() => {
            return this._sounds[id].play(delay);
        });
    },

    stop() {
        _.invoke(this._sounds, "stop");
    },

    isPlaying(id) {
        return this._sounds[id].isPlaying();
    }
};
