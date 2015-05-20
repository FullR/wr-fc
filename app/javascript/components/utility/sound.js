var React = require("react");
var soundManager = require("sound/sound-manager");

var Sound = React.createClass({
    componentWillMount: function() {
        this.sound = soundManager.get(this.props.path);

        if(this.props.onPlay) {
            this.sound.on("play", this.props.onPlay);
        }
        if(this.props.onEnd) {
            this.sound.on("end", this.props.onEnd);
        }

        this.sound.load().then(() => {
            if(this.props.autoplay) {
                if(this.props.delay) {
                    this.timeout = setTimeout(() => {
                        this.timeout = null;
                        this.sound.play();
                    }, this.props.delay);
                }
                else {
                    this.sound.play();
                }
            }
        });
    },

    componentWillUnmount: function() {
        if(this.sound) {
            soundManager.release(this.sound);
        }
        if(this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    },

    play: function() {
        if(this.isMounted()) {
            return this.sound.play();
        }
    },

    stop: function() {
        if(this.isMounted()) {
            return this.sound.stop();
        }
    },

    isPlaying: function() {
        return this.sound.isPlaying();
    },

    render: function() {
        return <div style={{display: "none"}}/>;
    }
});

module.exports = Sound;
