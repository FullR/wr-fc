const React = require("react");
const _ = require("lodash");
const soundManager = require("sound/sound-manager");
const Q = require("q");
const queue = require("utility/queue");

function wait(ms) {
    const deferred = Q.defer();
    const tid = setTimeout(deferred.resolve, ms);
    let done = false;
    deferred.stop = function() {
        if(!done) {
            clearTimeout(tid);
            deferred.resolve();
        }
    };
    deferred.promise.then(() => {done = true});

    return deferred;
}

const Sounds = React.createClass({
    load() {
        return Q.all(_.invoke(this.sounds, "load"));
    },

    play() {
        const delay = this.props.delay;

        this._queue = queue(this.sounds, (sound, index) => {
            return sound.play(delay);
        });

        return this._queue.promise.then(() => {
            this._queue = null;
        });
    },

    stop() {
        if(this._queue) {
            this._queue.stop();
            this._queue = null;
        }
        _.invoke(this.sounds, "stop");
    },

    release() {
        _.invoke(this.sounds, "release");
    },

    componentDidMount() {
        this.sounds = this.props.paths.map(soundManager.get);
        this.load().then(() => {
            if(this.props.autoplay) {
                return this.play();
            }
        });
    },

    componentWillUnmount() {
        this.stop();
        this.release();
        if(this.deferred) {
            this.deferred.stop();
            this.deferred = null;
        }
    },

    render() {
        return (
            <div style={{display: "none"}}/>
        );
    }
});

module.exports = Sounds;
