var React = require("react");
var _ = require("lodash");
var soundManager = require("sound/sound-manager");
var Q = require("q");
var queue = require("utility/queue");

function wait(ms) {
    var deferred = Q.defer();
    var tid = setTimeout(deferred.resolve, ms);
    var done = false;
    deferred.stop = function() {
        if(!done) {
            clearTimeout(tid);
            deferred.resolve();
        }
    };
    deferred.promise.then(() => {done = true});

    return deferred;
}

var Sounds = React.createClass({
    load: function() {
        return Q.all(_.invoke(this.sounds, "load"));
    },

    play: function() {
        var delay = this.props.delay;
        /*return this.sounds.reduce((q, sound, index) => {
            return q.then(() => {
                if(this.isMounted()) {
                    return sound.play(index ? delay : null);
                }
            });
        }, Q.resolve());*/
        this._queue = queue(this.sounds, (sound, index) => {
            return sound.play(index ? delay : null);
        });

        return this._queue.promise.then(() => {
            this._queue = null;
        });
    },

    stop: function() {
        console.log("Stopping", this._queue);
        if(this._queue) {
            this._queue.stop();
            this._queue = null;
        }
        _.invoke(this.sounds, "stop");
    },

    release: function() {
        _.invoke(this.sounds, "release");
    },

    componentDidMount: function() {
        this.sounds = this.props.paths.map(soundManager.get);
        this.load().then(() => {
            if(this.props.autoplay) {
                return this.play();
            }
        });
    },

    componentWillUnmount: function() {
        this.stop();
        this.release();
        if(this.deferred) {
            this.deferred.stop();
        }
    },

    render: function() {
        return (
            <div style={{display: "none"}}/>
        );
    }
});

module.exports = Sounds;
