var React = require("react");
var _ = require("lodash");
var soundManager = require("sound/sound-manager");
var Q = require("q");

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
        return this.sounds.reduce((q, sound) => {
            return q.then(() => {
                if(this.isMounted()) {
                    return sound.play();
                }
            }).then(() => {
                if(this.props.delay && this.isMounted()) {
                    this.deferred = wait(this.props.delay);
                    return this.deferred.promise;
                }
            });
        }, Q.resolve());
    },

    stop: function() {
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